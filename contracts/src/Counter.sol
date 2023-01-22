// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
contract TradeCentral is ReentrancyGuard {

     //@dev global variables
    address public owner;

    uint256 userCount;
    uint256 tradeCount;

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
        uint256 id;
        address user;
        string email;
        string name;
        string image;
    }

    mapping(uint256 => userData) public users;
    mapping(uint256 => Trade) public trades;

//@dev constructor
    constructor() {
        owner = msg.sender;
    }

//@dev function  create one userr
    function createUser(
        string memory _email,
        string memory _name,
        string memory image
    ) external nonReentrant {
        require(msg.sender != address(0), "Invalid address");
        require(bytes(_email).length > 0, "Invalid email");
        require(bytes(_name).length > 0, "Invalid name");
        require(bytes(image).length > 0, "Invalid image");
        userCount++;
        users[userCount] = userData(
            userCount,
            msg.sender,
            _email,
            _name,
            image
        );
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
        tradeCount++;
        trades[tradeCount] = Trade(
            tradeCount,
           address(0),
            msg.sender,
            _price,
            _name,
            _description,
            _image,
            false
        );
    }

    //@dev function for update profile user

     function updateProfile(
          string memory _email,
          string memory _name,
          string memory _image
     ) external  nonReentrant{
          require(msg.sender != address(0), "Invalid address");
          require(bytes(_email).length > 0, "Invalid email");
          require(msg.sender == users[userCount].user, "Invalid user");
          require(bytes(_name).length > 0, "Invalid name");
          require(bytes(_image).length > 0, "Invalid image");
          users[userCount].email = _email;
          users[userCount].name = _name;
          users[userCount].image = _image;
     }


     //@dev function for look trades in the market
      function lookTrades(uint256 _itemId) public view returns(Trade memory){
         Trade storage _trade = trades[_itemId];
           return _trade;
     }

     //@dev function for look users in the market
      function lookUsers(uint256 _userId) public view returns(userData memory){
         userData storage _user = users[_userId];
           return _user;
     }

     //@dev function for buy one trade
      function buyTrade(uint256 _itemId) public payable nonReentrant{
          require(msg.value == trades[_itemId].price, "Invalid value");
          require(trades[_itemId].isSold == false, "Invalid trade, item sold");
          require(trades[_itemId].seller != address(0), "Invalid seller");
          require(trades[_itemId].seller != msg.sender, "Invalid seller");
          trades[_itemId].buyer = msg.sender;
            trades[_itemId].isSold = true;
          payable(trades[_itemId].seller).transfer(msg.value);
          delete trades[_itemId];
      }

      //@dev function for cancel one trade
      function cancelTrade(uint256 _itemId) public nonReentrant{
          require(msg.sender != address(0), "Invalid address");
          require(trades[_itemId].isSold == false, "Invalid trade, item sold");
          require(trades[_itemId].seller != address(0), "Invalid seller");
          require(trades[_itemId].seller == msg.sender, "Invalid seller");
          delete trades[_itemId];
      }

      //@dev function for withdraw one trade
      function cancelAllTrades() public nonReentrant{
          require(msg.sender != address(0), "Invalid address");
          for(uint256 i = 1; i <= tradeCount; i++){
              if(trades[i].seller == msg.sender){
                  delete trades[i];
              }
          }
}
}