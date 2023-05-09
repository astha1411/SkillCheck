// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IChatApp {
    struct account {
        string name;
        bool role; //0 means user, 1 means organisation
        address ID;
    }
    
    // function accountList(address) external view returns (account memory);

    // function userSkillList(address) external view returns (string[] memory);

    struct experience {
        bytes32 expID;
        address accountID;
        address orgID;
        string orgName;
        uint64 stMonth; //1-12
        uint64 stYear; //1980-2023
        uint64 endMonth;
        uint64 endYear;
        bool verificationStatus; //0 means unverified, 1 means verified
    }

    struct job {
        bytes32 jobID;
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

}