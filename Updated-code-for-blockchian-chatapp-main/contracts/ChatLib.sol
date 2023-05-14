// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IChatApp.sol";

library ChatLib {
    function _getUsername(mapping(address => IChatApp.account) storage accountList, address pubkey) external view returns (string memory) {
        return accountList[pubkey].name;
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

    

    

    //GET ALL JOBS
    function _getAllJobs(
        mapping(bytes32 => IChatApp.job) storage jobMap,
        bytes32[] storage allJobIDs,
        uint allJobIDslength
    ) public view returns (IChatApp.job[] memory) {
        uint count = 0;
        for (uint i = 0; i < allJobIDslength; i++) {
            if (jobMap[allJobIDs[i]].openingsLeft != 0) {
                count++;
            }
        }
        IChatApp.job[] memory openJobs = new IChatApp.job[](count);
        uint j = 0;
        for (uint i = 0; i < allJobIDslength; i++) {
            if (jobMap[allJobIDs[i]].openingsLeft != 0) {
                openJobs[j] = jobMap[allJobIDs[i]];
                j++;
            }
        }
        return openJobs;
    }

    //GET YOUR JOBS
    function _getJobs(
        mapping(bytes32 => IChatApp.job) storage jobMap,
        mapping(address => bytes32[]) storage orgJobPostings
    ) external view returns (IChatApp.job[] memory) {
        uint l = orgJobPostings[msg.sender].length;
        IChatApp.job[] memory jobs = new IChatApp.job[](l);
        for (uint i = 0; i < l; i++) {
            jobs[i] = jobMap[orgJobPostings[msg.sender][i]];
        }
        return jobs;
    }

    //GET ALL JOBS BY IDS (INPUT ARRAY OF JOBIDS, RETURN ARRAY OF JOBS)
    function _getAllJobsByIDs(
        mapping(bytes32 => IChatApp.job) storage jobMap,
        bytes32[] memory jobIDs
    ) public view returns (IChatApp.job[] memory) {
        uint length = jobIDs.length;
        IChatApp.job[] memory jobs = new IChatApp.job[](length);

        for (uint i = 0; i < length; i++) {
            jobs[i] = jobMap[jobIDs[i]];
        }

        return jobs;
    }

    //VERIFY SKILL REQ OF JOB ARE MET
    function _VerifySkillReq(
        mapping(bytes32 => IChatApp.job) storage jobMap,
        mapping(address => string[]) storage userSkillList,
        bytes32 jobID
        ) public view returns (bool) {

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
    function _checkAlreadyApplied(
        mapping(bytes32 => IChatApp.applications) storage applicationsMap,
        mapping(bytes32 => bytes32[]) storage jobApplicantList,
        bytes32 jobID
        ) public view returns (bool) {
    bytes32[] memory _applications = jobApplicantList[jobID];
    for (uint256 i = 0; i < _applications.length; i++) {
        IChatApp.applications memory application = applicationsMap[_applications[i]];
        if (application.userID == msg.sender) {
            return true;
        }
    }
    return false;
}

//APPLY TO JOB
    function _applyToJob(
        mapping(bytes32 => IChatApp.applications) storage applicationsMap,
        mapping(bytes32 => bytes32[]) storage jobApplicantList,
        mapping(address => bytes32[]) storage userApplicationList,
        bytes32 jobID
        ) public {
        bytes32 applicationsID = keccak256(
                abi.encodePacked(jobID, msg.sender)
            );
        IChatApp.applications memory newApplication = IChatApp.applications(
            applicationsID,
            jobID,
            msg.sender,
            "ongoing"
        );
        applicationsMap[applicationsID] = newApplication;
        jobApplicantList[jobID].push(applicationsID);
        userApplicationList[msg.sender].push(applicationsID);
    }

        //ACCEPT APPLICANT
    function _selectApplicant(
        mapping(bytes32 => IChatApp.applications) storage applicationsMap,
        mapping(bytes32 => IChatApp.job) storage jobMap,
        bytes32 applicationID
        ) public {
    // Retrieve application details from the applicationsMap
    IChatApp.applications storage application = applicationsMap[applicationID];

    // Ensure the application is not already selected or rejected
    require(
        keccak256(bytes(application.applicationStatus)) ==
        keccak256(bytes("ongoing")),
        "Application has already been processed"
    );

    // Update application status to "selected"
    application.applicationStatus = "selected";

    // Decrement openingsLeft by 1
    bytes32 jobID = application.jobID;
    IChatApp.job storage jobDetails = jobMap[jobID];
    require(jobDetails.openingsLeft > 0, "No openings left");
    jobDetails.openingsLeft--;

    // Update job status to false if openingsLeft is 0
    if (jobDetails.openingsLeft == 0) {
        jobDetails.jobStatus = false;
    }
}

    // GET QUESTION ID

    function _getQuestionID(
        string memory questionLine,
        string memory option1,
        string memory option2,
        string memory option3,
        string memory option4,
        uint8 answer
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    questionLine,
                    option1,
                    option2,
                    option3,
                    option4,
                    answer
                )
            );
    }

    //ADD QUESTION (BEFORE APPROVAL)
    function _addQuestion(
        mapping(bytes32 => IChatApp.question) storage questionMap,
        IChatApp.proposedQuestion[] storage proposedQuestionList,
        string memory questionLine,
        string memory option1,
        string memory option2,
        string memory option3,
        string memory option4,
        uint8 answer,
        string memory skill
    ) external {
        bytes32 questionID = _getQuestionID(
            questionLine,
            option1,
            option2,
            option3,
            option4,
            answer
        );

        questionMap[questionID] = IChatApp.question({
            questionLine: questionLine,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            answer: answer
        });
        //if question is approved, only then is it pushed into quizMap
        // quizMap[skill].push(questionID);

        bytes32 proposedQuestionID = keccak256(
            abi.encodePacked(msg.sender, questionID)
        );
        proposedQuestionList.push(
            IChatApp.proposedQuestion({
                proposedQuestionID: proposedQuestionID,
                questionID: questionID,
                skill: skill,
                acceptances: 0,
                rejections: 0
            })
        );
        // proposedQuestionsByOrgList[msg.sender].push(proposedQuestionID);
    }

    //VIEW QUIZ (BY SKILL)
    function _getQuestions(
        mapping(bytes32 => IChatApp.question) storage questionMap,
        mapping(string => bytes32[]) storage quizMap,
        string memory skill
    ) public view returns (IChatApp.question[] memory) {
        bytes32[] storage questions = quizMap[skill];
        uint256 numQuestions = questions.length;
        IChatApp.question[] memory quizQuestions = new IChatApp.question[](numQuestions);
        for (uint256 i = 0; i < numQuestions; i++) {
            quizQuestions[i] = questionMap[questions[i]];
        }
        return quizQuestions;
    }
}