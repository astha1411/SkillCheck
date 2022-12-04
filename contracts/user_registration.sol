//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;

contract createUser{
    address walletAdd;
    string govtId;
    uint256 public noOfUsers = 0;

    mapping(address => User) public users;

    struct User{
        uint _id;
        address _walletAdd;
        string _govtId;
    }

    function addUser(string memory _govtId) public{
        noOfUsers += 1;
        users[msg.sender] = User(noOfUsers, msg.sender, _govtId);
    }
    
}