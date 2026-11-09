// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @dev Test-only token. Never deploy outside a local / test network.
contract MockDOM is ERC20 {
    constructor() ERC20("Mock DOM", "mDOM") {
        _mint(msg.sender, 1_000_000_000 ether);
    }
}

/// @dev Test-only fee-on-transfer token (1% burned on every transfer) to check rejection.
contract MockFeeToken is ERC20 {
    constructor() ERC20("Fee Token", "FEE") {
        _mint(msg.sender, 1_000_000 ether);
    }

    function _update(address from, address to, uint256 value) internal override {
        if (from != address(0) && to != address(0)) {
            uint256 fee = value / 100;
            super._update(from, address(0), fee);
            super._update(from, to, value - fee);
        } else {
            super._update(from, to, value);
        }
    }
}
