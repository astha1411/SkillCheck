//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;

contract createOrg{
    address walletAdd;
    string orgId;
    string websiteUrl;
    uint256 public noOfOrgs = 0;

    mapping(address => Org) public orgs;

    struct Org{
        uint _id;
        address _walletAdd;
        string _orgId;
        string _websiteUrl;
    }

    function addUser(string memory _orgId, string memory _websiteUrl) public{
        noOfOrgs += 1;
        orgs[msg.sender] = Org(noOfOrgs, msg.sender, _orgId, _websiteUrl);
    }

    


}