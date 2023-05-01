

// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp{

    struct account{
        string name;
        bool role;//0 means user, 1 means organisation
        address ID;
    }

    mapping(address => account) accountList;
    account[] orgList;

    // string [5] skillList  = ["Python","JS","C++","Java","Kotlin"]; -> may keep in frontend, and not need here instead
    mapping(address => string[]) userSkillList;

    struct experience{
        bytes32 expID;
        address accountID;
        address orgID;
        string orgName;
        uint64 stMonth;//1-12
        uint64 stYear;//1980-2023
        uint64 endMonth;
        uint64 endYear;
        bool verificationStatus;//0 means unverified, 1 means verified
    }
    mapping(bytes32 => experience) experienceMap;//to search for experience by code
    mapping(address => bytes32[]) userExpList;//display in user profile. shows what are users experiences
    mapping(address => bytes32[]) orgPendingList;//display in pending profile list of orgs.

    struct job{
        bytes32 jobID;
        address orgID;
        string orgName;
        string role;
        string location;
        string package;
        uint8 openingsTotal;
        uint8 openingsLeft;
        bool jobStatus;//0 means open, 1 means closed
        string[] skillsRequired;
    }
    mapping(bytes32 => job) jobMap;
    bytes32[] allJobIDs;
    mapping(address => bytes32[]) orgJobPostings;//to see in org Home Page
    //will need to call list of jobs posted by orgID, then applicants applied for that job

    struct applications{
        bytes32 jobID;
        address userID;
        string applicationStatus;//ongoing,selected,rejected. can use uint8, but packing wise it will still take 256bits 
    }
    mapping(bytes32 => applications[]) jobApplicantList;//to see list of applicants for a job
    mapping(address => applications[]) userApplicationList;//to see list of jobs a user has applied to and their status

    struct question{
        // bytes32 questionID;
        string questionLine;
        string option1;//by default radio button value should be: "" 
        string option2;
        string option3;
        string option4;
        uint8 answer;//1,2,3,4
    }
    mapping(bytes32 => question) questionMap;

    // struct quiz{
    //     string skillName;//will also act as quizID
    //     question[] questions;
    // }
    //INSTEAD OF THIS, IT MIGHT BE BETTER TO USE A MAPPING FROM STRING (SKILLNAME) TO QUESTION ID ARRAY

    mapping(string => bytes32[]) quizMap;//to store all questions for a relevant skill (string)

    struct proposedQuestion{
        bytes32 proposedQuestionID;
        bytes32 questionID;
        string skill;
        uint8 acceptances;// crosses 5 -> accept -> push into quiz
        uint8 rejections;// crosses 5 -> delete
    }

    proposedQuestion[] proposedQuestionList;
    mapping(address => bytes32[]) proposedQuestionsByOrgList;//to see status of your questions 

    //-----------
    //METHODS

    //CHECK ACCOUNT EXIST
    function checkAccountExists(address pubkey) public view returns(bool){
        return bytes(accountList[pubkey].name).length > 0;
    }

    //CREATE ACCOUNT2
    function createAccount2(string calldata name, bool role) external {
        require(checkAccountExists(msg.sender) == false, "User already exists");
        require(bytes(name).length>0, "Username cannot be empty");

        accountList[msg.sender].name = name;
        accountList[msg.sender].role = role;
        accountList[msg.sender].ID = msg.sender;

        // getAllUsers.push(AllUserStruck(name,role, msg.sender)); might not require a list of all users
    }

    //GET USERNAME2
    function getUsername2(address pubkey) external view returns(string memory){//might have to make the function public
    //since it may be required by internal functions
        return accountList[pubkey].name;
    }

    //GET ROLE2
    function getRole2(address pubkey) public view returns(bool){
        return accountList[pubkey].role;
    }

    //ADD SKILLS (USER ONLY)
    function addSkills(string[] memory skills) external {//frontend will send all skills in alphabetical order whenever a single skill is to be added
        require(getRole2(msg.sender) == false, "Account is not User type");
        userSkillList[msg.sender] = new string[](skills.length);
        for(uint i = 0; i < skills.length; i++) {
            userSkillList[msg.sender][i] = skills[i];
        }
    }

    //GET SKILLS
    function getUserSkillList(address userAddress) external view returns (string[] memory) {
    require(getRole2(userAddress) == false, "Account is not User type");
    return userSkillList[userAddress];
}

    

    //GET EXPERIENCE ID
    function _getExperienceID(address accountID, address orgID, string memory orgName, uint8 stMonth, uint8 stYear, uint8 endMonth, uint8 endYear) internal pure returns(bytes32) {
    //returns bytes32 used in experienceMap
    return keccak256(abi.encodePacked(accountID, orgID, orgName, stMonth, stYear, endMonth, endYear));
}

    //ADD EXPERIENCE
    function addExperience(address orgID, string calldata orgName, uint8 stMonth, uint8 stYear, uint8 endMonth, uint8 endYear ) external {
        //accountID == msg.sender, verificationStatus == false by default
        // Add input validation in frontend, fields can't be blank etc

        bytes32 experienceID = _getExperienceID(msg.sender, orgID, orgName, stMonth, stYear, endMonth, endYear);
        experienceMap[experienceID].expID = experienceID;
        experienceMap[experienceID].accountID = msg.sender;
    experienceMap[experienceID].orgID = orgID;
    experienceMap[experienceID].orgName = orgName;
    experienceMap[experienceID].stMonth = stMonth;
    experienceMap[experienceID].stYear = stYear;
    experienceMap[experienceID].endMonth = endMonth;
    experienceMap[experienceID].endYear = endYear;
    experienceMap[experienceID].verificationStatus = false;

    userExpList[msg.sender].push(experienceID);
    orgPendingList[orgID].push(experienceID);
    }

    //GET USER EXP
function getUserExperiences(address userAddress) external view returns (experience[] memory) {
    bytes32[] memory expIDs = userExpList[userAddress];
    experience[] memory exps = new experience[](expIDs.length);
    for (uint i = 0; i < expIDs.length; i++) {
        exps[i] = experienceMap[expIDs[i]];
    }
    return exps;//returns array of experiences 
}

    //GET PENDING EXPS (experiences that havent been verified yet)
    function getOrgPendingExperiences() public view returns (experience[] memory) {
    bytes32[] memory pendingJobs = orgPendingList[msg.sender];
    experience[] memory pendingExperiences = new experience[](pendingJobs.length);
    for (uint i = 0; i < pendingJobs.length; i++) {
        pendingExperiences[i] = experienceMap[pendingJobs[i]];
    }
    return pendingExperiences;
}

    //VERIFY EXP
    function verifyExp(bytes32 expID) public {
    experienceMap[expID].verificationStatus = true;
    address orgID = experienceMap[expID].orgID;
    bytes32[] storage orgExpList = orgPendingList[orgID];
    for (uint i = 0; i < orgExpList.length; i++) {
        if (orgExpList[i] == expID) {
            // remove the expID from the array
            orgExpList[i] = orgExpList[orgExpList.length - 1];
            orgExpList.pop();
            break;
        }
    }
}

    //REJECT EXP
    function rejectExp(bytes32 expID) public {
    experience storage exp = experienceMap[expID];
    require(exp.orgID == msg.sender, "Only the organization can reject the experience");
    require(!exp.verificationStatus, "The experience is already verified");
    bytes32[] storage orgPending = orgPendingList[msg.sender];
    for (uint i = 0; i < orgPending.length; i++) {
        if (orgPending[i] == expID) {
            orgPending[i] = orgPending[orgPending.length - 1];
            orgPending.pop();
            break;
        }
    }

    bytes32[] storage userExp = userExpList[exp.accountID];
    for (uint i = 0; i < userExp.length; i++) {
        if (userExp[i] == expID) {
            userExp[i] = userExp[userExp.length - 1];
            userExp.pop();
            break;
        }
    }
}


    //GET JOB ID
    function _getJobID(address orgID, string memory role, string memory location, string memory package, uint8 openingsTotal) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(orgID, role, location, package, openingsTotal));
}


    //ADD JOB
function addJob(string calldata role, string calldata location, string calldata package, uint8 openingsTotal, string[] memory skillsRequired) external {
    //require that account is organisation type
    bytes32 jobID = _getJobID(msg.sender, role, location, package, openingsTotal);
    jobMap[jobID].jobID = jobID;
    jobMap[jobID].orgID = msg.sender;
    jobMap[jobID].orgName = userList[msg.sender].name;
    jobMap[jobID].role = role;
    jobMap[jobID].location = location;
    jobMap[jobID].package = package;
    jobMap[jobID].openingsTotal = openingsTotal;
    jobMap[jobID].openingsLeft = openingsTotal;//when the job is created, all openings will be remaining
    jobMap[jobID].jobStatus = false;
    jobMap[jobID].skillsRequired = new string[](skillsRequired.length);
    for(uint i = 0; i < skillsRequired.length; i++) {
        jobMap[jobID].skillsRequired[i] = skillsRequired[i];
    }
    allJobIDs.push(jobID);
    orgJobPostings[msg.sender].push(jobID);
}

    //GET ALL JOBS
    function getAllJobs() public view returns (job[] memory) {
    uint count = 0;
    for (uint i = 0; i < allJobIDs.length; i++) {
        if (jobMap[allJobIDs[i]].openingsLeft != 0) {
            count++;
        }
    }
    job[] memory openJobs = new job[](count);
    uint j = 0;
    for (uint i = 0; i < allJobIDs.length; i++) {
        if (jobMap[allJobIDs[i]].openingsLeft != 0) {
            openJobs[j] = jobMap[allJobIDs[i]];
            j++;
        }
    }
    return openJobs;
}

    //GET YOUR JOBS
    function getJobs() external view returns(job[] memory){
        uint l = orgJobPostings[msg.sender].length;
        job[] memory jobs = new job[](l);
        for (uint i = 0; i < l; i++) {
            jobs[i] = jobMap[orgJobPostings[msg.sender][i]];
        }
        return jobs;
    }

    //TODO: MODIFY JOBS TO INCLUDE JOBID, CLICK ON A JOB TO BE REDIRECTED TO JOB PAGE

    //GET ORG's JOB IDS
    function getJobIDByOrg(address _account) public view returns (bytes32[] memory) {
    return orgJobPostings[_account];
}

    //GET ALL JOB IDS
    function getAllJobIDs() public view returns (bytes32[] memory) {
    uint256 numJobs = allJobIDs.length;
    bytes32[] memory jobIDs = new bytes32[](numJobs);
    for (uint256 i = 0; i < numJobs; i++) {
        jobIDs[i] = allJobIDs[i];
    }
    return jobIDs;
}

    //GET ALL JOBS BY IDS (INPUT ARRAY OF JOBIDS, RETURN ARRAY OF JOBS)
    function getAllJobsByIDs(bytes32[] memory jobIDs) public view returns (job[] memory) {
    uint length = jobIDs.length;
    job[] memory jobs = new job[](length);
    
    for(uint i = 0; i < length; i++){
        jobs[i] = jobMap[jobIDs[i]];
    }
    
    return jobs;
}

    //GET JOB DETAILS (GET DETAILS OF SINGLE JOB)
    function getJobDetails(bytes32 jobID) public view returns (job memory) {
    require(jobMap[jobID].orgID != address(0), "Job does not exist");
    return jobMap[jobID];
}


    //APPLY TO JOB
    //DEPENDENT ON VERIFYSKILLREQ(), CHECKALREADYAPPLIED()

    //VERIFY SKILL REQ OF JOB ARE MET 
   function VerifySkillReq(bytes32 jobID) public view returns(bool) {
    require(!getRole2(msg.sender), "Account is not User type");

    string[] storage requiredSkills = jobMap[jobID].skillsRequired;
    string[] storage userSkills = userSkillList[msg.sender];

    uint i = 0;
    uint j = 0;

    while (i < requiredSkills.length && j < userSkills.length) {
        bytes memory reqSkill = bytes(requiredSkills[i]);
        bytes memory userSkill = bytes(userSkills[j]);

        if (keccak256(reqSkill) == keccak256(userSkill)) {
            i++;
            j++;
        } else {
            if (userSkill[0] < reqSkill[0]) {
                j++;
            } else {
                return false;
            }
        }
    }

    return (i == requiredSkills.length);
}


    //CHECKALREADYAPPLIED
    function checkAlreadyApplied(bytes32 jobID) public view returns (bool) {
    for (uint256 i = 0; i < jobApplicantList[jobID].length; i++) {
        if (jobApplicantList[jobID][i].userID == msg.sender) {
            return true;
        }
    }
    return false;
}

    //APPLY TO JOB
    function applyToJob(bytes32 jobID) public {
    require(!checkAlreadyApplied(jobID), "User has already applied for the job.");
    require(VerifySkillReq(jobID), "User does not meet the required skills for the job.");
    applications memory newApplication = applications(jobID, msg.sender, "ongoing");
    jobApplicantList[jobID].push(newApplication);
    userApplicationList[msg.sender].push(newApplication);
}

    //GET YOU APPLICANTS (FOR ORG)
function getApplicants(bytes32 jobID) public view returns (uint256[] memory, address[] memory, string[] memory, string[] memory) {
    applications[] memory jobApplications = jobApplicantList[jobID];
    uint256 numApplicants = jobApplications.length;
    uint256[] memory numSkills = new uint256[](numApplicants);
    address[] memory userIDs = new address[](numApplicants);
    string[] memory names = new string[](numApplicants);
    string[] memory statuses = new string[](numApplicants);

    for (uint256 i = 0; i < numApplicants; i++) {
        address userID = jobApplications[i].userID;
        numSkills[i] = userSkillList[userID].length;
        userIDs[i] = userID;
        names[i] = accountList[userID].name;
        statuses[i] = jobApplications[i].applicationStatus;
    }

    return (numSkills, userIDs, names, statuses);
}



    //GET YOUR APPLICATIONS (FOR USER)
   function getYourApplications() public view returns (string[] memory, string[] memory, string[] memory) {
    applications[] memory userApplications = userApplicationList[msg.sender];
    string[] memory orgNames = new string[](userApplications.length);
    string[] memory roles = new string[](userApplications.length);
    string[] memory statuses = new string[](userApplications.length);
    for (uint i = 0; i < userApplications.length; i++) {
        bytes32 jobID = userApplications[i].jobID;
        job memory jobDetails = jobMap[jobID];
        orgNames[i] = jobDetails.orgName;
        roles[i] = jobDetails.role;
        statuses[i] = userApplications[i].applicationStatus;
    }
    return (orgNames, roles, statuses);
}





    //GET QUESTION ID
    
function _getQuestionID(string memory questionLine, string memory option1, string memory option2, string memory option3, string memory option4, uint8 answer) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(questionLine, option1, option2, option3, option4, answer));
}
    //ADD QUESTION (BEFORE APPROVAL)
  function addQuestion(string memory questionLine, string memory option1, string memory option2, string memory option3, string memory option4, uint8 answer, string memory skill) external {
    bytes32 questionID = _getQuestionID(questionLine, option1, option2, option3, option4, answer);

    questionMap[questionID] = question({
        questionLine: questionLine,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer
    });
    //if question is approved, only then is it pushed into quizMap
    // quizMap[skill].push(questionID);

    bytes32 proposedQuestionID = keccak256(abi.encodePacked(msg.sender, questionID));
    proposedQuestionList.push(proposedQuestion({
        proposedQuestionID: proposedQuestionID,
        questionID: questionID,
        skill: skill,
        acceptances: 0,
        rejections: 0
    }));
    proposedQuestionsByOrgList[msg.sender].push(proposedQuestionID);
}


    //VIEW QUIZ (BY SKILL)
    function getQuestions(string memory skill) public view returns (question[] memory) {
    bytes32[] storage questions = quizMap[skill];
    uint256 numQuestions = questions.length;
    question[] memory quizQuestions = new question[](numQuestions);
    for (uint256 i = 0; i < numQuestions; i++) {
        quizQuestions[i] = questionMap[questions[i]];
    }
    return quizQuestions;
}

    //VIEW PENDING APPROVALS
    function getAllProposedQuestions() public view returns (proposedQuestion[] memory) {
    return proposedQuestionList;
}

    //ACCEPT QUESTION
    function acceptProposedQuestion(bytes32 proposedQuestionID) external {
    // Find the proposed question in the proposedQuestionList
    uint256 i;
    for (i = 0; i < proposedQuestionList.length; i++) {
        if (proposedQuestionList[i].proposedQuestionID == proposedQuestionID) {
            break;
        }
    }

    // Increase the acceptances count of the proposed question
    proposedQuestionList[i].acceptances++;

    // If acceptances reach 5, add question to the quizMap and remove proposed question from list
    if (proposedQuestionList[i].acceptances == 5) {
        bytes32 questionID = proposedQuestionList[i].questionID;
        string memory skill = proposedQuestionList[i].skill;

        // Add question ID to quizMap for the relevant skill
        quizMap[skill].push(questionID);

        // Remove proposed question from list
        
                proposedQuestionList[i] = proposedQuestionList[proposedQuestionList.length - 1];
                proposedQuestionList.pop();
        

        // Remove proposed question ID from org's list
        bytes32[] storage orgProposedQuestions = proposedQuestionsByOrgList[msg.sender];
        for (uint256 j = 0; j < orgProposedQuestions.length; j++) {
            if (orgProposedQuestions[j] == proposedQuestionID) {
                orgProposedQuestions[j] = orgProposedQuestions[orgProposedQuestions.length - 1];
                orgProposedQuestions.pop();
                break;
            }
        }
    }
}


    //REJECT QUESTION


    //----------------------------------------------------------------------------------------------------


    //USER STRUCTSD
    struct user{
        string name;
        bool role;//0 means user, 1 means organisation
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruck{
        string name;
        bool role;
        address accountAddress;
    }

    AllUserStruck[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    //CHECK USER EXIST
    function checkUserExists(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata name, bool role) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length>0, "Username cannot be empty");

        userList[msg.sender].name = name;
        userList[msg.sender].role = role;

        getAllUsers.push(AllUserStruck(name,role, msg.sender));
    }

    //GET USERNAME
    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    //GET ROLE
    function getRole(address pubkey) external view returns(bool){
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].role;
    }

    //ADD FRIENDS
    function addFriend(address friend_key, string calldata name) external{
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered!");
        require(msg.sender != friend_key, "Users cannot add themeselves as friends");
        require(checkAlreadyFriends(msg.sender, friend_key)== false, "These users are already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    //checkAlreadyFriends
    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns (bool){

        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for(uint256 i = 0; i < userList[pubkey1].friendList.length; i++){
            
            if(userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    function _addFriend(address me, address friend_key, string memory name) internal{
        friend memory newFriend = friend(friend_key, name);
       userList[me].friendList.push(newFriend);
    }

    //GETMY FRIEND
    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }

    //get chat code
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32){
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else 
        return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }
    

    //SEND MESSAGE
    function sendMessage(address friend_key, string calldata _msg) external{
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "You are not friend with the given user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    //READ MESSAGE
    function readMessage(address friend_key) external view returns(message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUser() public view returns(AllUserStruck[] memory){
        return getAllUsers;
    }
}