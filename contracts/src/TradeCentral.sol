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

    function getTotalTrades() public view returns (uint256) {
        return currentTrade();
    }

    function getTotalUsers() public view returns (uint256) {
        return currentUser();
    }

    struct userData {
        string email;
        string name;
        string image;
    }

    //@dev structs
    struct Trade {
        uint256 id;
        address buyer;
        address seller;
        uint256 price;
        string description;
        string image;
        string[] name;
        string[] category;
        string[] country;
        bool isSold;
    }

    mapping(address => userData) public users;
    mapping(uint256 => Trade) public trades;
    mapping(bytes32 => uint256[]) public nameToTradeId;
    string[] public names;
    mapping(bytes32 => uint256[]) public categoryToTradeIds;
    string[] public categories;
    mapping(bytes32 => uint256[]) public countryToTradeIds;
    string[] public countries;

    function getTradesByName(string memory _name)
        public
        view
        returns (uint256[] memory)
    {
        return nameToTradeId[keccak256(abi.encodePacked(_name))];
    }

    function getTradesByCategory(string memory _category)
        public
        view
        returns (uint256[] memory)
    {
        return categoryToTradeIds[keccak256(abi.encodePacked(_category))];
    }

    function getTradesByCountry(string memory _country)
        public
        view
        returns (uint256[] memory)
    {
        return countryToTradeIds[keccak256(abi.encodePacked(_country))];
    }

    function getTradesByCountryAndCategory(
        string memory _country,
        string memory _category
    ) public view returns (uint256[] memory) {
        require(
            keccak256(abi.encodePacked(_country)) !=
                keccak256(abi.encodePacked("")),
            "Country cannot be empty"
        );
        require(
            keccak256(abi.encodePacked(_category)) !=
                keccak256(abi.encodePacked("")),
            "Category cannot be empty"
        );
        uint256[] memory categoryTrades = getTradesByCategory(_category);
        uint256[] memory countryTrades = getTradesByCountry(_country);
        uint256[] memory result = new uint256[](categoryTrades.length);
        uint256 index = 0;
        for (uint256 i = 0; i < categoryTrades.length; i++) {
            for (uint256 j = 0; j < countryTrades.length; j++) {
                if (categoryTrades[i] == countryTrades[j]) {
                    result[index] = categoryTrades[i];
                    index++;
                }
            }
        }
        return result;
    }

    function getTradesByCountryAndName(
        string memory _country,
        string memory _name
    ) public view returns (uint256[] memory) {
        require(
            keccak256(abi.encodePacked(_name)) !=
                keccak256(abi.encodePacked("")),
            "Name cannot be empty"
        );

        require(
            keccak256(abi.encodePacked(_country)) !=
                keccak256(abi.encodePacked("")),
            "Country cannot be empty"
        );
        uint256[] memory nameTrades = getTradesByName(_name);
        uint256[] memory countryTrades = getTradesByCountry(_country);
        uint256[] memory result = new uint256[](nameTrades.length);
        uint256 index = 0;
        for (uint256 i = 0; i < nameTrades.length; i++) {
            for (uint256 j = 0; j < countryTrades.length; j++) {
                if (nameTrades[i] == countryTrades[j]) {
                    result[index] = nameTrades[i];
                    index++;
                }
            }
        }
        return result;
    }

    function getTradesByCategoryAndName(
        string memory _category,
        string memory _name
    ) public view returns (uint256[] memory) {
        require(
            keccak256(abi.encodePacked(_name)) !=
                keccak256(abi.encodePacked("")),
            "Name cannot be empty"
        );
        require(
            keccak256(abi.encodePacked(_category)) !=
                keccak256(abi.encodePacked("")),
            "Category cannot be empty"
        );
        uint256[] memory nameTrades = getTradesByName(_name);
        uint256[] memory categoryTrades = getTradesByCategory(_category);
        uint256[] memory result = new uint256[](nameTrades.length);
        uint256 index = 0;
        for (uint256 i = 0; i < nameTrades.length; i++) {
            for (uint256 j = 0; j < categoryTrades.length; j++) {
                if (nameTrades[i] == categoryTrades[j]) {
                    result[index] = nameTrades[i];
                    index++;
                }
            }
        }
        return result;
    }

    // function that returns and array of the names of all countries, and the serialized name in the same index
    function getCountries() public view returns  ( string[][] memory ) {
        string[][] memory result = new string[][](countries.length);
        if (countries.length == 0) {
            return result;
        }

        for (uint256 i = 0; i < countries.length; i++) {
            result[i] = new string[](2);
            result[i][0] = countries[i];
            result[i][1] = trades[ countryToTradeIds[keccak256(abi.encodePacked(countries[i]))][0] ].country[1];
        }
        return result;
    }

    function getCategories() public view returns (string[][] memory) {
        string[][] memory result = new string[][](categories.length);
        if (categories.length == 0) {
            return result;
        }

        for (uint256 i = 0; i < categories.length; i++) {
            result[i] = new string[](2);
            result[i][0] = categories[i];
            result[i][1] = trades[ categoryToTradeIds[keccak256(abi.encodePacked(categories[i]))][0] ].category[1];
        }
        return result;
    }

    

    function stringArrayFromBytes32Array(bytes32[] memory arr)
        private
        pure
        returns (string[] memory)
    {
        string[] memory result = new string[](arr.length);
        for (uint256 i = 0; i < arr.length; i++) {
            result[i] = bytes32ToString(arr[i]);
        }
        return result;
    }

    function bytes32ToString(bytes32 x) private pure returns (string memory) {
        bytes memory bytesString = new bytes(32);
        for (uint256 i = 0; i < 32; i++) {
            bytesString[i] = x[i];
        }
        return string(bytesString);
    }

    function searchTrades(
        string memory _country,
        string memory _category,
        string memory _name
    ) public view returns (uint256[] memory) {
        if (bytes(_country).length > 0) {
            if (bytes(_category).length > 0) {
                if (bytes(_name).length > 0) {
                    return getTradesByAll(_name, _category, _country);
                } else {
                    return getTradesByCountryAndCategory(_country, _category);
                }
            } else {
                if (bytes(_name).length > 0) {
                    return getTradesByCountryAndName(_country, _name);
                } else {
                    return getTradesByCountry(_country);
                }
            }
        } else {
            if (bytes(_category).length > 0) {
                if (bytes(_name).length > 0) {
                    return getTradesByCategoryAndName(_name, _category);
                } else {
                    return getTradesByCategory(_category);
                }
            } else {
                if (bytes(_name).length > 0) {
                    return getTradesByName(_name);
                } else {
                    return new uint256[](0);
                }
            }
        }
    }

    function getTradesByIds(uint256[] memory ids)
        public
        view
        returns (Trade[] memory)
    {
        require(ids.length > 0, "Invalid ids");
        Trade[] memory result = new Trade[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            if (trades[ids[i]].id == 0) {
                revert("Invalid id");
            }
            result[i] = trades[ids[i]];
        }
        return result;
    }

    // @dev function to get all trades results from search
    function searchTradesByAll(
        string memory _country,
        string memory _category,
        string memory _name
    ) public view returns (Trade[] memory) {
        require(
            bytes(_country).length > 0 ||
                bytes(_category).length > 0 ||
                bytes(_name).length > 0,
            "Invalid search"
        );
        uint256[] memory ids = searchTrades(_country, _category, _name);
        if (ids.length == 0) {
            return new Trade[](0);
        }
        return getTradesByIds(ids);
    }

    function getTradesByAll(
        string memory _name,
        string memory _category,
        string memory _country
    ) public view returns (uint256[] memory) {
        bytes32 name = keccak256(abi.encodePacked(_name));
        bytes32 category = keccak256(abi.encodePacked(_category));
        bytes32 country = keccak256(abi.encodePacked(_country));
        uint256[] memory nameTrades = nameToTradeId[name];
        uint256[] memory categoryTrades = categoryToTradeIds[category];
        uint256[] memory countryTrades = countryToTradeIds[country];
        uint256[] memory result = new uint256[](nameTrades.length);
        uint256 index = 0;
        for (uint256 i = 0; i < nameTrades.length; i++) {
            for (uint256 j = 0; j < categoryTrades.length; j++) {
                for (uint256 k = 0; k < countryTrades.length; k++) {
                    if (
                        nameTrades[i] == categoryTrades[j] &&
                        nameTrades[i] == countryTrades[k]
                    ) {
                        result[index] = nameTrades[i];
                        index++;
                    }
                }
            }
        }
        return result;
    }

    //@dev constructor
    constructor() {
        owner = msg.sender;
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

    function normalizeString(string memory input)
        public
        pure
        returns (string memory)
    {
        bytes memory output = new bytes(bytes(input).length);
        // remplace white spaces and any other character that are not a letter or a number by a dash
        for (uint256 i = 0; i < bytes(input).length; i++) {
            if (bytes(input)[i] == 0x20) {
                output[i] = 0x2D;
            } else if (
                (bytes(input)[i] >= 0x30 && bytes(input)[i] <= 0x39) ||
                (bytes(input)[i] >= 0x41 && bytes(input)[i] <= 0x5A) ||
                (bytes(input)[i] >= 0x61 && bytes(input)[i] <= 0x7A)
            ) {
                output[i] = bytes(input)[i];
            } else {
                output[i] = 0x2D;
            }
        }

        // remplace uppercase by lowercase
        for (uint256 i = 0; i < bytes(output).length; i++) {
            if (bytes(output)[i] >= 0x41 && bytes(output)[i] <= 0x5A) {
                output[i] = bytes1(uint8(bytes(output)[i]) + 32);
            }
        }

        return string(output);
    }

    //@dev function create one trade
    function createTrade(
        uint256 _price,
        string memory _name,
        string memory _description,
        string memory _category,
        string memory _country,
        string memory _image
    ) external nonReentrant {
        require(msg.sender != address(0), "Invalid address");
        require(_price > 0, "Invalid price");
        require(bytes(_name).length > 0, "Invalid name");
        require(bytes(_description).length > 0, "Invalid description");
        // require(bytes(_image).length > 0, "Invalid image");
        require(bytes(_category).length > 0, "Invalid category");
        require(bytes(_country).length > 0, "Invalid country");
        // the name is max 120 characters
        require(bytes(_name).length <= 120, "Max 120 characters for name");
        require(
            bytes(_category).length <= 20,
            "Max 20 characters for category"
        );
        require(bytes(_country).length <= 20, "Max 20 characters for country");

        if (bytes(_image).length == 0) {
            _image = "placeholderhash";
        }

        incrementTrade();
        uint256 _tradeId = currentTrade();
        // create SEO friendly name, category and country, no special characters, we store the original name, category and country in the mapping
        string memory _clean_name = normalizeString(_name);
        string memory _clean_category = normalizeString(_category);
        string memory _clean_country = normalizeString(_country);
        string[] memory _indexed_name = new string[](2);
        _indexed_name[0] = _clean_name;
        _indexed_name[1] = _name;
        string[] memory _indexed_category = new string[](2);
        _indexed_category[0] = _clean_category;
        _indexed_category[1] = _category;
        string[] memory _indexed_country = new string[](2);
        _indexed_country[0] = _clean_country;
        _indexed_country[1] = _country;

        trades[_tradeId] = Trade(
            _tradeId,
            address(0),
            msg.sender,
            _price,
            _description,
            _image,
            _indexed_name,
            _indexed_category,
            _indexed_country,
            false
        );


        nameToTradeId[keccak256(abi.encodePacked(_clean_name))].push(_tradeId);
        if (
            nameToTradeId[keccak256(abi.encodePacked(_clean_name))].length == 1
        ) {
            names.push(_clean_name);
        }
        categoryToTradeIds[keccak256(abi.encodePacked(_clean_category))].push(
            _tradeId
        );
        if (
            categoryToTradeIds[keccak256(abi.encodePacked(_clean_category))]
                .length == 1
        ) {
            categories.push(_clean_category);
        }
        countryToTradeIds[keccak256(abi.encodePacked(_clean_country))].push(
            _tradeId
        );
        if (
            countryToTradeIds[keccak256(abi.encodePacked(_clean_country))]
                .length == 1
        ) {
            countries.push(_clean_country);
        }
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

    //@dev function for look trades in the market by id
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

    // @dev function for look by user
    // TODO: use a mapping to store the trades by user address
    function lookAllTrades(address _userAddress)
        public
        view
        returns (Trade[] memory)
    {
        require(_userAddress != address(0), "Invalid address");
        // get the total of trades for the user address
        uint256 currentTradeCount = currentTrade();
        uint256 total = 0;
        for (uint256 i = 1; i <= currentTradeCount; i++) {
            if (trades[i].seller == _userAddress) {
                total++;
            }
        }

        if (total == 0) {
            return new Trade[](0);
        }

        Trade[] memory _trades = new Trade[](total);
        uint256 index = 0;
        for (uint256 i = 1; i <= currentTradeCount; i++) {
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
        trades[_itemId].isSold = true;
        payable(trades[_itemId].seller).transfer(msg.value);
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
