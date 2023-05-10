// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IChatApp.sol";
import "./ChatLib.sol";

contract ChatAppV2 is IChatApp {
    mapping(address => account) private _accountList;
    // function accountList(address _address) external view returns (account memory) {
    //     return _accountList[_address];
    // }
    account[] orgList;
    
    mapping(address => string[]) private _userSkillList;
    // function userSkillList(address _address) external view returns (string[] memory) {
    //     return _userSkillList[_address];
    // }

    mapping(bytes32 => experience) private _experienceMap; //to search for experience by code
    mapping(address => bytes32[]) private _userExpList; //display in user profile. shows what are users experiences
    mapping(address => bytes32[]) private _orgPendingList; //display in pending profile list of orgs.

    mapping(bytes32 => job) private _jobMap;
    bytes32[] allJobIDs;
    mapping(address => bytes32[]) private _orgJobPostings;

    mapping(bytes32 => applications) _applicationsMap;//stores all applications as bytes32 for lighter and faster access
    mapping(bytes32 => bytes32[]) _jobApplicantList; //to see list of applicants for a job
    mapping(address => bytes32[]) _userApplicationList; //to see list of jobs a user has applied to and their status

    mapping(bytes32 => question) _questionMap;
    mapping(string => bytes32[]) _quizMap; //to store all questions for a relevant skill (string)
    proposedQuestion[] _proposedQuestionList;//SCOPE OF IMPROVEMENT HERE. CAN USE MAP, SINCE WE HAVE TO ITERATE OVER THE LIST IN MANY FUNCTIONS  
    //----------------------------------------

    //CHECK ACCOUNT EXIST
    function checkAccountExists(address _address) public view returns (bool){
        return bytes(_accountList[_address].name).length > 0;
    }
    //GET USERNAME2
    function getUsername2(address _address) external view returns (string memory) {
        return ChatLib._getUsername(_accountList, _address);
    }
    //CREATE ACCOUNT2
    function createAccount2(string memory name, bool role) external {
       ChatLib._createAccount(_accountList, name, role);
    }
    //GET ROLE2
    function getRole2(address _address) public view returns (bool) {
        // return ChatLib._getRole2(_accountList, _address);
        return _accountList[_address].role;
    }
    //ADD SKILLS (USER ONLY)
    function addSkills(string[] memory skills) external {
        //frontend will send all skills in alphabetical order whenever a single skill is to be added
        require(getRole2(msg.sender) == false, "Account is not User type");
        ChatLib._addSkills(_userSkillList, skills);
    }
    //GET SKILLS
    function getUserSkillList(
        address userAddress
    ) external view returns (string[] memory) {
        require(getRole2(userAddress) == false, "Account is not User type");
        return _userSkillList[userAddress];
    }
    //ADD EXPERIENCE
    function addExperience(
        address orgID,
        string calldata orgName,
        uint8 stMonth,
        uint8 stYear,
        uint8 endMonth,
        uint8 endYear
    ) external {
        ChatLib._addExperience(_experienceMap, _userExpList, _orgPendingList , orgID, orgName, stMonth, stYear, endMonth, endYear);
    
    }
    //GET USER EXP
    function getUserExperiences(
        address userAddress
    ) external view returns (experience[] memory) {
        return ChatLib._getUserExperiences(_experienceMap, _userExpList, userAddress); //returns array of experiences
    }
    //GET PENDING EXPS
    function getOrgPendingExperiences()
        public
        view
        returns (experience[] memory)
    {
        return ChatLib._getOrgPendingExperiences(_experienceMap, _orgPendingList);
    }
    
    //VERIFY EXPERIENCE
    function verifyExp(
            bytes32 expID
        ) public {
        ChatLib._verifyExp(_experienceMap, _orgPendingList, expID);
    }


    //REJECT EXPERIENCE
    function rejectExp(bytes32 expID) public {
        ChatLib._rejectExp(_experienceMap, _orgPendingList, _userExpList, expID);
    }

    //ADD JOBS
    function addJob(
        string calldata role,
    string calldata location,
    string calldata package,
    uint8 openingsTotal,
    string[] memory skillsRequired
    ) external {
        bytes32 jobID = ChatLib._addJob(_jobMap, _orgJobPostings, _accountList, role, location, package, openingsTotal, skillsRequired);
        allJobIDs.push(jobID);
    }

    //GET ALL JOBS
    function getAllJobs() public view returns (job[] memory) {
        return ChatLib._getAllJobs(_jobMap, allJobIDs, allJobIDs.length);
    }

    //GET YOUR JOBS
    function getJobs() external view returns (job[] memory) {
        return ChatLib._getJobs(_jobMap, _orgJobPostings);
    }

    //GET ORG's JOB IDS
    function getJobIDByOrg(
        address account
    ) public view returns (bytes32[] memory) {
        return _orgJobPostings[account];
    }

    //GET ALL JOB IDS
    function getAllJobIDs() public view returns (bytes32[] memory) {
        return allJobIDs;
    }

    //GET ALL JOBS BY IDS (INPUT ARRAY OF JOBIDS, RETURN ARRAY OF JOBS)
    function getAllJobsByIDs(
        bytes32[] memory jobIDs
    ) public view returns (job[] memory) {
        return ChatLib._getAllJobsByIDs(_jobMap, jobIDs);
    }

    //GET JOB DETAILS (GET DETAILS OF SINGLE JOB)
    function getJobDetails(bytes32 jobID) public view returns (job memory) {
        require(_jobMap[jobID].orgID != address(0), "Job does not exist");
        return _jobMap[jobID];
    }

    //VERIFY SKILL REQ OF JOB ARE MET
    function VerifySkillReq(bytes32 jobID) public view returns (bool) {
        require(!getRole2(msg.sender), "Account is not User type");
        return ChatLib._VerifySkillReq(_jobMap, _userSkillList, jobID);
    }

    //CHECKALREADYAPPLIED
    function checkAlreadyApplied(bytes32 jobID) public view returns (bool) {
        return ChatLib._checkAlreadyApplied(_applicationsMap,_jobApplicantList, jobID);
    }

    //APPLY TO JOB
    function applyToJob(bytes32 jobID) public {
        require(
            !checkAlreadyApplied(jobID),
            "User has already applied for the job."
        );
        require(
            VerifySkillReq(jobID),
            "User does not meet the required skills for the job."
        );
        ChatLib._applyToJob(_applicationsMap, _jobApplicantList, _userApplicationList, jobID);
    }

    //GET YOUR APPLICANTS (FOR ORG)
    function getApplicants(bytes32 jobID) public view returns (bytes32[] memory, address[] memory, string[] memory, string[] memory, bytes32[] memory) {
    bytes32[] memory applicationIDs = _jobApplicantList[jobID];
    uint256 numApplicants = applicationIDs.length;
    bytes32[] memory jobIDs = new bytes32[](numApplicants);
    address[] memory userIDs = new address[](numApplicants);
    string[] memory names = new string[](numApplicants);
    string[] memory statuses = new string[](numApplicants);
    

    for (uint256 i = 0; i < numApplicants; i++) {
        bytes32 applicationID = applicationIDs[i];
        applications memory currentApplication = _applicationsMap[applicationID];
        jobIDs[i] = currentApplication.jobID;
        userIDs[i] = currentApplication.userID;
        names[i] = _accountList[userIDs[i]].name;
        statuses[i] = currentApplication.applicationStatus;
    }

    return (jobIDs, userIDs, names, statuses, applicationIDs);
}


    //GET YOUR APPLICATIONS (FOR USER)
    function getYourApplications()
        public
        view
        returns (
            bytes32[] memory,
            string[] memory,
            string[] memory,
            string[] memory
        )
    {
        bytes32[] memory applicationIDs = _userApplicationList[msg.sender];
        uint256 numApplications = applicationIDs.length;
        bytes32[] memory jobIDs = new bytes32[](numApplications);
        string[] memory orgNames = new string[](numApplications);
        string[] memory roles = new string[](numApplications);
        string[] memory statuses = new string[](numApplications);
        
        for (uint256 i = 0; i < numApplications; i++) {
            bytes32 applicationID = applicationIDs[i];
            applications memory applicationDetails = _applicationsMap[applicationID];
            jobIDs[i] = applicationDetails.jobID;
            job memory jobDetails = _jobMap[jobIDs[i]];
            orgNames[i] = jobDetails.orgName;
            roles[i] = jobDetails.role;
            statuses[i] = applicationDetails.applicationStatus;
        }
        
        return (jobIDs, orgNames, roles, statuses);
    }

    //ACCEPT APPLICANT
    function selectApplicant(bytes32 applicationID) public {
        ChatLib._selectApplicant(_applicationsMap, _jobMap, applicationID);

    }

    //REJECT APPLICANT
    function rejectApplicant(bytes32 applicationID) public {
    require(_applicationsMap[applicationID].userID == msg.sender, "You are not authorized to reject this application.");
    _applicationsMap[applicationID].applicationStatus = "rejected";
}

    // ADD QUESTION (BEFORE APPROVAL)
    function addQuestion(
        string memory questionLine,
        string memory option1,
        string memory option2,
        string memory option3,
        string memory option4,
        uint8 answer,
        string memory skill
    ) external {
        ChatLib._addQuestion(_questionMap, _proposedQuestionList, questionLine, option1, option2, option3, option4, answer, skill);
    }

}