// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {TradeCentral} from "../src/TradeCentral.sol";

contract TradeCentralScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        new TradeCentral();
    }
}
