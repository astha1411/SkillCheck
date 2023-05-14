// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IChatApp.sol";

library ChatLib2 {
    //CREATE ACCOUNT
    function _createAccount(mapping(address => IChatApp.account) storage accountList, 
    IChatApp.account[] storage orgList,
    string memory name,
    bool role) external {
    IChatApp.account memory newAccount = IChatApp.account(name, role, msg.sender);
    accountList[msg.sender] = newAccount;
    if(role) {
    orgList.push(newAccount);
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
    mapping(address => bytes32[]) storage orgJobPostings,
    mapping(address => IChatApp.account) storage accountList,
    // bytes32[] storage allJobIDs ,
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
    // _addJobHelper(allJobIDs, jobID);
    orgJobPostings[msg.sender].push(jobID);
    return jobID;
}
    function getOrgList(
    IChatApp.account[] storage orgList
    ) public view returns (IChatApp.account[] storage) {
        return orgList;
    }

    function _viewPendingApprovals(
    mapping(bytes32 => IChatApp.question) storage questionMap,
    IChatApp.proposedQuestion[] storage proposedQuestionList
) public view returns (IChatApp.ProposedQuestionWithDetails[] memory) {
    IChatApp.ProposedQuestionWithDetails[] memory proposedQuestionsWithDetails = new IChatApp.ProposedQuestionWithDetails[](proposedQuestionList.length);
    
    for (uint i = 0; i < proposedQuestionList.length; i++) {
        IChatApp.proposedQuestion memory _proposedQuestion = proposedQuestionList[i];
        IChatApp.question memory _question = questionMap[_proposedQuestion.questionID];
        
        proposedQuestionsWithDetails[i] = IChatApp.ProposedQuestionWithDetails({
            proposedQuestionID: _proposedQuestion.proposedQuestionID,
            questionID: _proposedQuestion.questionID,
            skill: _proposedQuestion.skill,
            questionLine: _question.questionLine,
            option1: _question.option1,
            option2: _question.option2,
            option3: _question.option3,
            option4: _question.option4,
            answer: _question.answer
        });
    }
    
    return proposedQuestionsWithDetails;
}

    //ACCEPT PROPOSED QUESTION
    function _acceptProposedQuestion(
        IChatApp.proposedQuestion[] storage proposedQuestionList,
        mapping(string => bytes32[]) storage quizMap,
        bytes32 proposedQuestionID
        ) external {
        // Find the proposed question in the proposedQuestionList
        uint256 i;
        for (i = 0; i < proposedQuestionList.length; i++) {
            if (
                proposedQuestionList[i].proposedQuestionID == proposedQuestionID
            ) {
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

            proposedQuestionList[i] = proposedQuestionList[
                proposedQuestionList.length - 1
            ];
            proposedQuestionList.pop();            
        }
    }

    //REJECT PROPOSED QUESTION
    function _rejectProposedQuestion(
        IChatApp.proposedQuestion[] storage proposedQuestionList,
        bytes32 proposedQuestionID
        ) external {
        // Find the proposed question in the proposedQuestionList
        uint256 i;
        for (i = 0; i < proposedQuestionList.length; i++) {
            if (
                proposedQuestionList[i].proposedQuestionID == proposedQuestionID
            ) {
                break;
            }
        }

        // Increase the acceptances count of the proposed question
        proposedQuestionList[i].rejections++;

        // If acceptances reach 5, add question to the quizMap and remove proposed question from list
        if (proposedQuestionList[i].rejections == 5) {
            // bytes32 questionID = proposedQuestionList[i].questionID;
            
            // Remove proposed question from list
            proposedQuestionList[i] = proposedQuestionList[
                proposedQuestionList.length - 1
            ];
            proposedQuestionList.pop();            
        }
    }

}