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
    function _checkAccountExists(mapping(address => IChatApp.account) storage accountList, address pubkey) public view returns (bool) {
        return bytes(accountList[pubkey].name).length > 0;
    }

}