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

    struct applications {
        bytes32 applicationsID;
        bytes32 jobID;
        address userID;
        string applicationStatus; //ongoing,selected,rejected. can use uint8, but packing wise it will still take 256bits
    }

    struct question {
        // bytes32 questionID;
        string questionLine;
        string option1; //by default radio button value should be: ""
        string option2;
        string option3;
        string option4;
        uint8 answer; //1,2,3,4
    }

    struct proposedQuestion {
        bytes32 proposedQuestionID;
        bytes32 questionID;
        string skill;
        uint8 acceptances; // crosses 5 -> accept -> push into quiz
        uint8 rejections; // crosses 5 -> delete
    }

    struct ProposedQuestionWithDetails {
    bytes32 proposedQuestionID;
    bytes32 questionID;
    string skill;
    string questionLine;
    string option1;
    string option2;
    string option3;
    string option4;
    uint8 answer;
}
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

}