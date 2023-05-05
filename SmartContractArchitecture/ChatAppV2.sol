// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IChatApp.sol";
import "./ChatLib.sol";

contract ChatAppV2 is IChatApp {
    mapping(address => account) private _accountList;
    function accountList(address _address) external view override returns (account memory) {
        return _accountList[_address];
    }
    account[] orgList;

    function getUsername(address _address) external view returns (string memory) {
        return ChatLib._getUsername(_accountList, _address);
    }
    function createAccount(string memory name, bool role) external {
    ChatLib._createAccount(_accountList, name, role);
}
}
