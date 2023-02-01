// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TradeCentral is ReentrancyGuard {
    //@dev global variables
    address public owner;

    using Counters for Counters.Counter;

    // trades counter, track the number of elements in a mapping, and provide a way to iterate over them
    Counters.Counter private _trades_counter;

    function currentTrade() public view returns (uint256) {
        return _trades_counter.current();
    }

    function incrementTrade() public {
        _trades_counter.increment();
    }

    function decrementTrade() public {
        _trades_counter.decrement();
    }

    function resetTrade() public {
        _trades_counter.reset();
    }

    // users counter, track the number of elements in a mapping, and provide a way to iterate over them
    Counters.Counter private _users_counter;

    function currentUser() public view returns (uint256) {
        return _users_counter.current();
    }

    function incrementUser() public {
        _users_counter.increment();
    }

    function decrementUser() public {
        _users_counter.decrement();
    }

    function resetUser() public {
        _users_counter.reset();
    }

    //@dev structs
    struct Trade {
        uint256 id;
        address buyer;
        address seller;
        uint256 price;
        string name;
        string description;
        string image;
        bool isSold;
    }

    struct userData {
        string email;
        string name;
        string image;
    }

    mapping(address => userData) public users;
    mapping(uint256 => Trade) public trades;

    //@dev constructor
    constructor() {
        owner = msg.sender;
    }

    function getTotalTrades() public view returns (uint256) {
        return currentTrade();
    }

    function getTotalUsers() public view returns (uint256) {
        return currentUser();
    }

    //@dev function create user with image
    function createUser(
        string memory _email,
        string memory _name,
        string memory image
    ) external nonReentrant {
        require(msg.sender != address(0), "Invalid address");
        require(bytes(_email).length > 0, "Invalid email");
        require(bytes(_name).length > 0, "Invalid name");
        require(bytes(image).length > 0, "Invalid image");
        users[msg.sender] = userData(_email, _name, image);
        incrementUser();
    }

    // create user without image
    function createUser(string memory _email, string memory _name)
        external
        nonReentrant
    {
        require(msg.sender != address(0), "Invalid address");
        require(bytes(_email).length > 0, "Invalid email");
        require(bytes(_name).length > 0, "Invalid name");
        users[msg.sender] = userData(_email, _name, "");
        incrementUser();
    }

    //@dev function create one trade
    function createTrade(
        uint256 _price,
        string memory _name,
        string memory _description,
        string memory _image
    ) external nonReentrant {
        require(msg.sender != address(0), "Invalid address");
        require(_price > 0, "Invalid price");
        require(bytes(_name).length > 0, "Invalid name");
        require(bytes(_description).length > 0, "Invalid description");
        require(bytes(_image).length > 0, "Invalid image");
        incrementTrade();
        trades[currentTrade()] = Trade(
            currentTrade(),
            address(0),
            msg.sender,
            _price,
            _name,
            _description,
            _image,
            false
        );
        // totalTrades++;
    }

    //@dev function create one trade wihout image
    function createTrade(
        uint256 _price,
        string memory _name,
        string memory _description
    ) external nonReentrant {
        require(msg.sender != address(0), "Invalid address");
        require(_price > 0, "Invalid price");
        require(bytes(_name).length > 0, "Invalid name");
        require(bytes(_description).length > 0, "Invalid description");
        incrementTrade();
        string memory _image = "";
        trades[currentTrade()] = Trade(
            currentTrade(),
            address(0),
            msg.sender,
            _price,
            _name,
            _description,
            _image,
            false
        );
        // totalTrades++;
    }

    //@dev function for update profile user
    function updateProfile(
        string memory _email,
        string memory _name,
        string memory _image
    ) external nonReentrant {
        require(
            bytes(users[msg.sender].email).length > 0,
            "User does not exist"
        );
        require(msg.sender != address(0), "Invalid address");
        require(bytes(_email).length > 0, "Invalid email");
        require(bytes(_name).length > 0, "Invalid name");
        require(bytes(_image).length > 0, "Invalid image");
        users[msg.sender].email = _email;
        users[msg.sender].name = _name;
        users[msg.sender].image = _image;
    }

    // update profile without image
    function updateProfile(string memory _email, string memory _name)
        external
        nonReentrant
    {
        require(
            bytes(users[msg.sender].email).length > 0,
            "User does not exist"
        );
        require(msg.sender != address(0), "Invalid address");
        require(bytes(_email).length > 0, "Invalid email");
        require(bytes(_name).length > 0, "Invalid name");
        users[msg.sender].email = _email;
        users[msg.sender].name = _name;
    }

    //@dev function for look trades in the market
    function lookTrades(uint256 _itemId) public view returns (Trade memory) {
        // validate that trade exists
        require(trades[_itemId].id > 0, "Trade does not exist");
        Trade storage _trade = trades[_itemId];
        return _trade;
    }

    // @dev function for look all open trades in the market
    function lookAllTrades() public view returns (Trade[] memory) {
        // validate that trade exists, if not return empty array
        if (currentTrade() == 0) {
            return new Trade[](0);
        }

        Trade[] memory _trades = new Trade[](currentTrade());
        uint256 index = 0;
        for (uint256 i = 1; i <= currentTrade(); i++) {
            if (trades[i].isSold == false) {
                _trades[index] = trades[i];
                index++;
            }
        }
        return _trades;
    }

    // @dev function for look by user, without filtering by sold
    function lookAllTrades(address _userAddress)
        public
        view
        returns (Trade[] memory)
    {
        // requiere a valid address
        require(_userAddress != address(0), "Invalid address");
        // get the total of trades of the user
        uint256 total = totalTradesByUser(_userAddress);

        if (total == 0) {
            return new Trade[](0);
        }

        Trade[] memory _trades = new Trade[](total);
        uint256 index = 0;
        for (uint256 i = 1; i <= currentTrade(); i++) {
            if (trades[i].seller == _userAddress) {
                _trades[index] = trades[i];
                index++;
            }
        }

        return _trades;
    }

    // @dev function that returns the total  of trades of a user
    function totalTradesByUser(address _userAddress)
        public
        view
        returns (uint256)
    {
        uint256 total = 0;
        for (uint256 i = 1; i <= currentTrade(); i++) {
            if (trades[i].seller == _userAddress) {
                total++;
            }
        }
        return total;
    }

    //@dev function that checks if the user exists
    function userExists(address _userAddress) public view returns (bool) {
        if (bytes(users[_userAddress].email).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    //@dev function for look users in the market
    function lookUsers(address _userAddress)
        public
        view
        returns (userData memory)
    {
        // validate that user exists
        require(
            bytes(users[_userAddress].email).length > 0,
            "User does not exist"
        );
        userData storage _user = users[_userAddress];
        return _user;
    }

    //@dev function for buy one trade
    function buyTrade(uint256 _itemId) public payable nonReentrant {
        require(msg.value == trades[_itemId].price, "Invalid value");
        require(trades[_itemId].isSold == false, "Invalid trade, item sold");
        require(trades[_itemId].seller != address(0), "Invalid seller");
        require(trades[_itemId].seller != msg.sender, "Invalid seller");
        trades[_itemId].buyer = msg.sender;
        // payable(trades[_itemId].seller).transfer(msg.value);
        // delete trades[_itemId];
        // decrementTrade();
    }
  //@dev function for set in true the isSold
    function staking(uint256 _itemId) public nonReentrant{
        require(trades[_itemId].isSold == false, "Invalid trade, item sold");
        require(trades[_itemId].seller == msg.sender, "Invalid seller");
        trades[_itemId].isSold = true; 
        payable(trades[_itemId].seller).transfer(trades[_itemId].price);
        delete trades[_itemId];
        decrementTrade();
    }
    //@dev function for cancel one trade
    function cancelTrade(uint256 _itemId) public nonReentrant {
        require(msg.sender != address(0), "Invalid address");
        require(trades[_itemId].isSold == false, "Invalid trade, item sold");
        require(trades[_itemId].seller != address(0), "Invalid seller");
        require(trades[_itemId].seller == msg.sender, "Invalid seller");
        delete trades[_itemId];
        decrementTrade();
    }

    //@dev function for withdraw one trade
    function cancelAllTrades() public nonReentrant {
        require(msg.sender != address(0), "Invalid address");
        for (uint256 i = 1; i <= currentTrade(); i++) {
            if (trades[i].seller == msg.sender) {
                delete trades[i];
                decrementTrade();
            }
        }
    }
}
