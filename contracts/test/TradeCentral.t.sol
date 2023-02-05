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
        string memory image = "";
        // get user address
        address userAddress = vm.addr(uint256(uint160(alex)));
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
        string memory image = "";
        // prank the user address
        address userAddress = vm.addr(1);
        vm.prank(userAddress);
        trade.updateProfile(_email, _name, image);
        // asset user data
        TradeCentral.userData memory user = trade.lookUsers(userAddress);
        assertEq(user.email, _email);
        assertEq(user.name, _name);
        assertEq(user.image, "");
    }

    function createTrade() public {
        uint256 _price = 100;
        string memory _name = "test";
        string memory _description = "test";
        string memory _category = "test";
        string memory _cuntry = "test";
        string memory _image = "";
        address userAddress = vm.addr(1);
        vm.prank(userAddress);
        trade.createTrade(
            _price,
            _name,
            _description,
            _category,
            _cuntry,
            _image
        );
    }

    function testCreateTrade() public {
        createTrade();
        // assert trade count
        assertEq(trade.getTotalTrades(), 1);

        // assert default image hash
        TradeCentral.TradeData memory tradeData = trade.lookTrades(1);
        assertEq(tradeData.image, "QmX54vAab7hFB2XXuH9v1mcMLm2VyvbH5R65hSB7qytebZ");
    }

    function testCancelTrade() public {
        // create trade
        createTrade();
        // assert trade count
        assertEq(trade.getTotalTrades(), 1);
        // cancel trade that is not yours, should revert
        vm.prank(vm.addr(2));
        vm.expectRevert("Invalid seller");
        trade.cancelTrade(1);
        // assert trade count
        assertEq(trade.getTotalTrades(), 1);
        // cancel test create
        vm.prank(vm.addr(1));
        trade.cancelTrade(1);
        // assert trade, it shouldnt exist anymore and should be reverted
        vm.expectRevert("Trade does not exist");
        trade.lookTrades(1);
        // assert trade count
        assertEq(trade.getTotalTrades(), 0);
    }

    function testLookAllTrades() public {
        // look all trades
        TradeCentral.TradeData[] memory noTrades = trade.lookAllTrades();
        // assert trade count
        assertEq(noTrades.length, 0);
        // create trade
        createTrade();
        // assert trade count
        assertEq(trade.getTotalTrades(), 1);
        // look all trades
        TradeCentral.TradeData[] memory allTrades = trade.lookAllTrades();
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
        vm.prank(_address);
        trade.createTrade(100, "test", "test", "test", "test", "");
        TradeCentral.TradeData[] memory allTrades = trade.lookAllTrades();
        // assert trade count, 1 from addr(1) and 1 from addr(2)
        assertEq(allTrades.length, 2);
        assertEq(allTrades[0].seller, vm.addr(1));
        assertEq(allTrades[1].seller, _address);
        // look user trades for _address only
        TradeCentral.TradeData[] memory userTrades = trade.lookAllTrades(_address);
        // assert trade count
        assertEq(userTrades.length, 1);
        // assert trade with seller _address
        assertEq(userTrades[0].seller, _address);
    }

    // test search, by name, category, country
    function testSearch() public {
        // create 2 test trade
        createTrade();
        createTrade();
        // create trade with data
        trade.createTrade(
            100,
            "name",
            "description",
            "category",
            "country",
            ""
        );
        trade.createTrade(
            100,
            "name2",
            "description",
            "category2",
            "country",
            ""
        );
        // assert trade count
        assertEq(trade.getTotalTrades(), 4);

        // search by country
        TradeCentral.TradeData[] memory searchTrades = trade.searchTradesByAll(
            "country",
            "",
            ""
        );
        // assert trade count
        assertEq(searchTrades.length, 2);
        assertEq(searchTrades[0].country[1], "country");
        // search by country category
        TradeCentral.TradeData[] memory searchTrades2 = trade.searchTradesByAll(
            "country",
            "category",
            ""
        );
        
        assertEq(searchTrades2.length, 1);
        assertEq(searchTrades2[0].country[1], "country");
        assertEq(searchTrades2[0].category[1], "category");

        // search by country category name
        TradeCentral.TradeData[] memory searchTrades3 = trade.searchTradesByAll(
            "country",
            "category",
            "name"
        );
        
        // assert trade count
        assertEq(searchTrades3.length, 1);
        assertEq(searchTrades3[0].country[1], "country");
        assertEq(searchTrades3[0].category[1], "category");
        assertEq(searchTrades3[0].name[1], "name");

        // test by name only
        TradeCentral.TradeData[] memory searchTrades4 = trade.searchTradesByAll(
            "",
            "",
            "test"
        );
        // assert trade count
        assertEq(searchTrades4.length, 2);

        // test by category only
        TradeCentral.TradeData[] memory searchTrades5 = trade.searchTradesByAll(
            "",
            "test",
            ""
        );
        // assert trade count
        assertEq(searchTrades5.length, 2);
    }

    function testGetIndexedData() public {
        // create test trade
        createTrade();
        createTrade();
        // create a trade with wierd data and charateres to test the search
        trade.createTrade(
            100,
            "testing",
            "description",
            "Health & Beauty",
            " --County 1&  on",
            ""
        );
        // get the countries
        string[][] memory countries = trade.getCountries();
        // assert countries count
        assertEq(countries.length, 2); // only 1 from the tests (repeated) and 1 from the create
        // assert country name and generated slug
        assertEq(countries[1][0], "county-1-on");
        assertEq(countries[1][1], " --County 1&  on");

        // get the categories
        string[][] memory categories = trade.getCategories();
        // assert categories count
        assertEq(categories.length, 2); 
        assertEq(categories[1][0], "health-beauty");
        assertEq(categories[1][1], "Health & Beauty");
    }

    function testGetSearchTerm() public {
        trade.createTrade(
            100,
            "testing",
            "description",
            "Health & Beauty",
            "Some country name",
            ""
        );
        string memory searchTerm = trade.getSearchTerm("health-beauty");
        // emit log_string(searchTerm);
        assertEq(searchTerm, "Health & Beauty");

    }
}
