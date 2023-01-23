// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {TradeCentral} from "../src/TradeCentral.sol";

contract TradeCentralTest is Test {
    TradeCentral public trade;

    function setUp() public {
        trade = new TradeCentral();
    }

    function testCreateUser() public {
        string memory _email = "mails@alexpedersen.dev";
        string memory _name = "Alex Pedersen";
        string memory image = "NoImage";
        // create user
        trade.createUser(_email, _name, image);
        // asset user count
        assertEq(trade.getUserCount(), 1);

    }

    function testGetUser() public {
        // create user
        testCreateUser();
        // look for the user id
        TradeCentral.userData memory user = trade.lookUsers(1);
        // assert user id
        assertEq(user.id, 1);
    }

    function testUpdateProfile() public {
        // create user
        testCreateUser();
        // asset user count
        assertEq(trade.getUserCount(), 1);
        // update user
        string memory _email = "nuevo@alexpedersen.dev";
        string memory _name = "alexx855.eth";
        string memory image = "ImageHash";
        trade.updateProfile(_email, _name, image);

        // asset user data
        uint256 id = trade.getUserCount();
        TradeCentral.userData memory user = trade.lookUsers(id);
        assertEq(user.email, _email);
        assertEq(user.name, _name);
        assertEq(user.image, image);
    }

    function testCreateTrade() public {
        uint256 _price = 100;
        string memory _name = "test";
        string memory _description = "test";
        string memory _image = "test";
        trade.createTrade(_price, _name, _description, _image);
        // get the trade
        TradeCentral.Trade memory _tradeOrder = trade.lookTrades(1);
        // assert trade count
        assertEq(trade.getTradeCount(), 1);
        // assert trade data
        assertEq(_tradeOrder.price, _price);
        assertEq(_tradeOrder.name, _name);
        assertEq(_tradeOrder.description, _description);
        assertEq(_tradeOrder.image, _image);
    }

    function testCancelTrade() public {
        // create trade
        testCreateTrade();
        // assert trade count
        assertEq(trade.getTradeCount(), 1);
        // cancel trade
        trade.cancelTrade(1);
        // assert trade, it shouldnt exist anymore and should be reverted
        vm.expectRevert("Trade does not exist");
        trade.lookTrades(1);
    }

    function testCancelAllTrades() public {
        // create 3 trades
        testCreateTrade();
        testCreateTrade();
        testCreateTrade();
        // assert trade count
        assertEq(trade.getTradeCount(), 3);
        // cancel all trade
        trade.cancelAllTrades();
        // assert trade count
        assertEq(trade.getTradeCount(), 0);
    }
    
}
