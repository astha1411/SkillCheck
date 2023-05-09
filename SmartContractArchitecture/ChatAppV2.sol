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
}
