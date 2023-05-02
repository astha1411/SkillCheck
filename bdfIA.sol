// SPDX-License-Identifier: MIT
pragma solidity  >=0.7.0 <0.9.0;


contract Voting {
    // Variables
    uint public totalVotes;
    uint public proposalCount;
    uint public winningProposalId;
    address public owner;
    bool public isVotingOpen;
    mapping (address => bool) public voters;
    mapping (uint => Proposal) public proposals;


    struct Proposal {
        uint id;
        string name;
        uint voteCount;
    }


    // Events
    event ProposalAdded(uint proposalId, string proposalName);
    event VoteCasted(address voter, uint proposalId);
    event VotingClosed(uint winningProposalId);


    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }


    modifier votingOpen() {
        require(isVotingOpen, "Voting is closed.");
        _;
    }


    // Constructor
    constructor() {
        owner = msg.sender;
        //totalVotes = 0;
        //totalVotes = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
        totalVotes = 115792089237316195423570985008687907853269984665640564039457584007913129639934;
        winningProposalId = 0;
        isVotingOpen = false;
        proposalCount = 0;
    }


    // Functions
    function addProposal(string memory proposalName) public onlyOwner {
        require(bytes(proposalName).length > 0, "Proposal name cannot be empty.");
 
        uint proposalId = totalVotes + 1;
        proposals[proposalId] = Proposal({
            id: proposalId,
            name: proposalName,
            voteCount: 0
        });
        totalVotes += 1;
        
        emit ProposalAdded(proposalId, proposalName);
    }


    function vote(uint proposalId) public votingOpen {
        require(proposals[proposalId].id > 0, "Proposal does not exist.");
        require(!voters[msg.sender], "You have already voted.");
        proposals[proposalId].voteCount++;
        voters[msg.sender] = true;
        totalVotes++;
        emit VoteCasted(msg.sender, proposalId);
    }


    function closeVoting() public onlyOwner votingOpen {
        uint winningVoteCount = 0;
        for (uint i = 1; i <= totalVotes; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winningProposalId = proposals[i].id;
            }
        }
        isVotingOpen = false;
        emit VotingClosed(winningProposalId);
    }


    function startVoting() public onlyOwner {
        isVotingOpen = true;
    }

    



    function getProposal(uint proposalId) public view returns (string memory, uint) {
        require(proposals[proposalId].id > 0, "Proposal does not exist.");
        return (proposals[proposalId].name, proposals[proposalId].voteCount);
    }
    
}
