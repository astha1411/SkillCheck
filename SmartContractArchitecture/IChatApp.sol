// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IChatApp {
    struct account {
        string name;
        bool role; //0 means user, 1 means organisation
        address ID;
    }
    
    function accountList(address) external view returns (account memory);
}