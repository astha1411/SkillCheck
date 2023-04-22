// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    struct account {
        string name;
        bool role; //0 means user, 1 means organisation
        address ID;
    }

    mapping(address => account) accountList;
    account[] orgList;

    // string [5] skillList  = ["Python","JS","C++","Java","Kotlin"]; -> may keep in frontend, and not need here instead
    mapping(address => string[]) userSkillList;

    struct experience {
        //bytes32 experienceID;
        address accountID;
        address orgID;
        string orgName;
        uint64 stMonth; //1-12
        uint64 stYear; //1980-2023
        uint64 endMonth;
        uint64 endYear;
        bool verificationStatus; //0 means unverified, 1 means verified
    }
    mapping(bytes32 => experience) experienceMap; //to search for experience by code
    mapping(address => bytes32[]) userExpList; //display in user profile. shows what are users experiences
    mapping(address => bytes32[]) orgPendingList; //display in pending profile list of orgs.

    struct job {
        // bytes32 jobID;
        address orgID;
        string orgName;
        string role;
        string location;
        string package;
        uint8 openingsTotal;
        uint8 openingsLeft;
        bool jobStatus; //0 means open, 1 means closed
        string[] skillsRequired;
    }
    mapping(bytes32 => job) jobMap;
    mapping(address => bytes32[]) orgJobPostings; //to see in org Home Page
    //will need to call list of jobs posted by orgID, then applicants applied for that job

    struct applications {
        bytes32 jobID;
        address userID;
        string applicationStatus; //ongoing,selected,rejected. can use uint8, but packing wise it will still take 256bits
    }
    mapping(bytes32 => applications[]) jobApplicantList; //to see list of applicants for a job
    mapping(address => applications[]) userApplicationList; //to see list of jobs a user has applied to and their status

    struct question {
        bytes32 questionID;
        string questionLine;
        string option1; //by default radio button value should be: ""
        string option2;
        string option3;
        string option4;
        uint8 answer; //1,2,3,4
    }

    struct quiz {
        string skillName; //will also act as quizID
        question[] questions;
    }

    struct proposedQuestion {
        bytes32 proposedQuestionID;
        bytes32 questionID;
        string skill;
        uint8 acceptances; // crosses 5 -> accept -> push into quiz
        uint8 rejections; // crosses 5 -> delete
    }

    proposedQuestion[] proposedQuestionList;
    mapping(address => bytes32[]) proposedQuestionsByOrgList; //to see status of your questions

    //-----------
    //METHODS

    //CHECK ACCOUNT EXIST
    function checkAccountExists(address pubkey) public view returns (bool) {
        return bytes(accountList[pubkey].name).length > 0;
    }

    //CREATE ACCOUNT2
    function createAccount2(string calldata name, bool role) external {
        require(checkAccountExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        accountList[msg.sender].name = name;
        accountList[msg.sender].role = role;
        accountList[msg.sender].ID = msg.sender;

        // getAllUsers.push(AllUserStruck(name,role, msg.sender)); might not require a list of all users
    }

    //GET USERNAME2
    function getUsername2(
        address pubkey
    ) external view returns (string memory) {
        //might have to make the function public
        //since it may be required by internal functions
        return accountList[pubkey].name;
    }

    //GET ROLE2
    function getRole2(address pubkey) external view returns (bool) {
        return accountList[pubkey].role;
    }

    //GET EXPERIENCE ID
    function _getExperienceID(
        address accountID,
        address orgID,
        string memory orgName,
        uint8 stMonth,
        uint8 stYear,
        uint8 endMonth,
        uint8 endYear
    ) internal pure returns (bytes32) {
        //returns bytes32 used in experienceMap
        return
            keccak256(
                abi.encodePacked(
                    accountID,
                    orgID,
                    orgName,
                    stMonth,
                    stYear,
                    endMonth,
                    endYear
                )
            );
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
        //accountID == msg.sender, verificationStatus == false by default
        // Add input validation in frontend, fields can't be blank etc

        bytes32 experienceID = _getExperienceID(
            msg.sender,
            orgID,
            orgName,
            stMonth,
            stYear,
            endMonth,
            endYear
        );
        experienceMap[experienceID].accountID = msg.sender;
        experienceMap[experienceID].orgID = orgID;
        experienceMap[experienceID].orgName = orgName;
        experienceMap[experienceID].stMonth = stMonth;
        experienceMap[experienceID].stYear = stYear;
        experienceMap[experienceID].endMonth = endMonth;
        experienceMap[experienceID].endYear = endYear;
        experienceMap[experienceID].verificationStatus = false;
    }

    //GET JOB ID
    function _getJobID(
        address orgID,
        string memory role,
        string memory location,
        string memory package,
        uint8 openingsTotal
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(orgID, role, location, package, openingsTotal)
            );
    }

    //ADD JOB
    function addJob(
        string calldata role,
        string calldata location,
        string calldata package,
        uint8 openingsTotal,
        string[] calldata skillsRequired
    ) external {
        bytes32 jobID = _getJobID(
            msg.sender,
            role,
            location,
            package,
            openingsTotal
        );
        jobMap[jobID].orgID = msg.sender;
        jobMap[jobID].orgName = userList[msg.sender].name;
        jobMap[jobID].role = role;
        jobMap[jobID].location = location;
        jobMap[jobID].package = package;
        jobMap[jobID].openingsTotal = openingsTotal;
        jobMap[jobID].openingsLeft = openingsTotal; //when the job is created, all openings will be remaining
        jobMap[jobID].jobStatus = false;
        jobMap[jobID].skillsRequired = skillsRequired;
    }

    //----------------------------------------------------------------------------------------------------

    //USER STRUCTSD
    struct user {
        string name;
        bool role; //0 means user, 1 means organisation
        friend[] friendList;
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruck {
        string name;
        bool role;
        address accountAddress;
    }

    AllUserStruck[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    //CHECK USER EXIST
    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata name, bool role) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        userList[msg.sender].name = name;
        userList[msg.sender].role = role;

        getAllUsers.push(AllUserStruck(name, role, msg.sender));
    }

    //GET USERNAME
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    //GET ROLE
    function getRole(address pubkey) external view returns (bool) {
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].role;
    }

    //ADD FRIENDS
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered!");
        require(
            msg.sender != friend_key,
            "Users cannot add themeselves as friends"
        );
        require(
            checkAlreadyFriends(msg.sender, friend_key) == false,
            "These users are already friends"
        );

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    //checkAlreadyFriends
    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    function _addFriend(
        address me,
        address friend_key,
        string memory name
    ) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    //GETMY FRIEND
    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    //get chat code
    //get chat code
    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    //SEND MESSAGE
    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(
            checkAlreadyFriends(msg.sender, friend_key),
            "You are not friend with the given user"
        );

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    //READ MESSAGE
    function readMessage(
        address friend_key
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUser() public view returns (AllUserStruck[] memory) {
        return getAllUsers;
    }
}
