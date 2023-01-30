// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {TradeCentral} from "../src/TradeCentral.sol";

contract TradeCentralTest is Test {
    TradeCentral public trade;
    // create some test users addresses
    address alex = address(0x1);
    address tomi = address(0x2);
    address abel = address(0x3);

    function setUp() public {
        trade = new TradeCentral();
    }

    // creates a test user with the address 0x1
    function testCreateUser() public {
        // create user
        string memory _email = "mails@alexpedersen.dev";
        string memory _name = "Alex Pedersen";
        string memory image = "NoImage";
        // get user address
        address userAddress = vm.addr(1);
        vm.prank(userAddress);
        trade.createUser(_email, _name, image);
        // asset user lookup
        TradeCentral.userData memory user = trade.lookUsers(userAddress);
        // asset user data
        assertEq(user.email, _email);
    }

    function testGetUser() public {
        // create user
        testCreateUser();
        // look for the user id
        address userAddress = vm.addr(1);
        // prank the user address
        vm.prank(userAddress);
        TradeCentral.userData memory user = trade.lookUsers(userAddress);
        // should return the test user email
        assertEq(user.email, "mails@alexpedersen.dev");
    }

    function testUpdateProfile() public {
        // create user
        testCreateUser();

        // update user
        string memory _email = "nuevo@alexpedersen.dev";
        string memory _name = "alexx855.eth";
        string memory image = "ImageHash";

        // prank the user address
        address userAddress = vm.addr(1);
        vm.prank(userAddress);
        trade.updateProfile(_email, _name, image);

        // asset user data
        TradeCentral.userData memory user = trade.lookUsers(userAddress);
        assertEq(user.email, _email);
        assertEq(user.name, _name);
        assertEq(user.image, image);
    }

    function createTrade() public {
        uint256 _price = 100;
        string memory _name = "test";
        string memory _description = "test";
        string memory _image = "test";
        address userAddress = vm.addr(1);
        emit log_named_address("userAddress", userAddress);
        vm.prank(userAddress);
        trade.createTrade(_price, _name, _description, _image);
    }

    function testCreateTrade() public {
        createTrade();
        // assert trade count
        assertEq(trade.getTotalTrades(), 1);
    }

    // function testCancelTrade() public {
    //     // create trade
    //     createTrade();
    //     // assert trade count
    //     assertEq(trade.getTotalTrades(), 1);
    //     // cancel trade
    //     trade.cancelTrade(1);
    //     // assert trade, it shouldnt exist anymore and should be reverted
    //     vm.expectRevert("Trade does not exist");
    //     trade.lookTrades(1);
    //     // assert trade count
    //     assertEq(trade.getTotalTrades(), 0);
    // }

    // function testCancelAllTrades() public {
    //     // create trade
    //     createTrade();
    //     createTrade();
    //     createTrade();
    //     // assert trade count
    //     assertEq(trade.getTotalTrades(), 3);
    //     // cancel all trades
    //     trade.cancelAllTrades();
    //     // assert trade count
    //     assertEq(trade.getTotalTrades(), 0);
    // }

    function testLookAllTrades() public {
       // look all trades
        TradeCentral.Trade[] memory noTrades = trade.lookAllTrades();
        // assert trade count
        assertEq(noTrades.length, 0);
        // create trade
        createTrade();
        // assert trade count
        assertEq(trade.getTotalTrades(), 1);
        // look all trades
        TradeCentral.Trade[] memory allTrades = trade.lookAllTrades();
        // assert trade count
        assertEq(allTrades.length, 1);

        // assert trade seller
        assertEq(allTrades[0].seller, vm.addr(1));
    }

    function testLookAllTrades(address _address) public {
        // assert trade count to 0 for user
        assertEq(trade.lookAllTrades(_address).length, 0);
        // create trade with addr(1)
        createTrade();
        // assert trade count
        assertEq(trade.getTotalTrades(), 1);

        // address userAddress2 = vm.addr(2);
        vm.prank(_address);
        trade.createTrade(100, "test", "test", "test");
        TradeCentral.Trade[] memory allTrades = trade.lookAllTrades();
        // assert trade count, 1 from addr(1) and 1 from addr(2)
        assertEq(allTrades.length, 2);
        assertEq(allTrades[0].seller, vm.addr(1));
        assertEq(allTrades[1].seller, _address);

        emit log_named_address("userAddress2", _address);

        // look user trades for _address only
        TradeCentral.Trade[] memory userTrades = trade.lookAllTrades(_address);
        // assert trade count
        assertEq(userTrades.length, 1);
        // assert trade with seller _address
        assertEq(userTrades[0].seller, _address);
    }
}
