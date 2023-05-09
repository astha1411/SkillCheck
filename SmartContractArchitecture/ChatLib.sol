// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IChatApp.sol";

library ChatLib {
    function _getUsername(mapping(address => IChatApp.account) storage accountList, address pubkey) external view returns (string memory) {
        return accountList[pubkey].name;
}
    function _createAccount(mapping(address => IChatApp.account) storage accountList, string memory name, bool role) external {
    IChatApp.account memory newAccount = IChatApp.account(name, role, msg.sender);
    accountList[msg.sender] = newAccount;
}
    //CHECKACCOUNTEXISTS IMPLEMENTED IN CHATAPPV2
    // function _checkAccountExists(mapping(address => IChatApp.account) storage accountList, address pubkey) public view returns (bool) {
    //     return bytes(accountList[pubkey].name).length > 0;
    // }

    //GET ROLE2 IMPLEMENTED IN CHATAPPV2
    // function _getRole2(mapping(address => IChatApp.account) storage accountList,address pubkey) public view returns (bool) {
    //     return accountList[pubkey].role;
    // }

    function _addSkills(mapping(address => string[]) storage userSkillList, string[] memory skills) external {
        //frontend will send all skills in alphabetical order whenever a single skill is to be added
        userSkillList[msg.sender] = new string[](skills.length);
        for (uint i = 0; i < skills.length; i++) {
            userSkillList[msg.sender][i] = skills[i];
        }
    }
    //GET SKILLS: getUserSkillList IMPLEMENTED IN CHATAPPV2
    
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
    function _addExperience(
        mapping(bytes32 => IChatApp.experience) storage experienceMap, 
        mapping(address => bytes32[]) storage userExpList,
        mapping(address => bytes32[]) storage orgPendingList,
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
    function _getUserExperiences(
        mapping(bytes32 => IChatApp.experience) storage experienceMap, 
        mapping(address => bytes32[]) storage userExpList,
        address userAddress
    ) external view returns (IChatApp.experience[] memory) {
        bytes32[] memory expIDs = userExpList[userAddress];
        IChatApp.experience[] memory exps = new IChatApp.experience[](expIDs.length);
        for (uint i = 0; i < expIDs.length; i++) {
            exps[i] = experienceMap[expIDs[i]];
        }
        return exps; //returns array of experiences
    }

    //GET PENDING EXPS (experiences that havent been verified yet)
    function _getOrgPendingExperiences(
        mapping(bytes32 => IChatApp.experience) storage experienceMap,
        mapping(address => bytes32[]) storage orgPendingList
    )
        public
        view
        returns (IChatApp.experience[] memory)
    {
        bytes32[] memory pendingJobs = orgPendingList[msg.sender];
        IChatApp.experience[] memory pendingExperiences = new IChatApp.experience[](
            pendingJobs.length
        );
        for (uint i = 0; i < pendingJobs.length; i++) {
            pendingExperiences[i] = experienceMap[pendingJobs[i]];
        }
        return pendingExperiences;
    }

    //VERIFY EXP
    function _verifyExp(
            mapping(bytes32 => IChatApp.experience) storage experienceMap,
            mapping(address => bytes32[]) storage orgPendingList,
            bytes32 expID
        ) public {
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
    function _rejectExp(
            mapping(bytes32 => IChatApp.experience) storage experienceMap,
            mapping(address => bytes32[]) storage orgPendingList,
            mapping(address => bytes32[]) storage userExpList,
            bytes32 expID
        ) public {
        IChatApp.experience storage exp = experienceMap[expID];
        require(
            exp.orgID == msg.sender,
            "Only the organization can reject the experience"
        );
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
    function _addJob(
    mapping(bytes32 => IChatApp.job) storage jobMap,
    // bytes32[] allJobIDs,
    mapping(address => bytes32[]) storage orgJobPostings,
    mapping(address => IChatApp.account) storage accountList,
    string calldata role,
    string calldata location,
    string calldata package,
    uint8 openingsTotal,
    string[] memory skillsRequired
) external returns (bytes32 _jobID){
    //require that account is organisation type
    bytes32 jobID = _getJobID(
        msg.sender,
        role,
        location,
        package,
        openingsTotal
    );
    jobMap[jobID].jobID = jobID;
    jobMap[jobID].orgID = msg.sender;
    jobMap[jobID].orgName = accountList[msg.sender].name;
    jobMap[jobID].role = role;
    jobMap[jobID].location = location;
    jobMap[jobID].package = package;
    jobMap[jobID].openingsTotal = openingsTotal;
    jobMap[jobID].openingsLeft = openingsTotal; //when the job is created, all openings will be remaining
    jobMap[jobID].jobStatus = false;
    jobMap[jobID].skillsRequired = skillsRequired;
    // allJobIDs.push(jobID);
    orgJobPostings[msg.sender].push(jobID);
    return jobID;
}
}