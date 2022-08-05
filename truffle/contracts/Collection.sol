// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Collection is ERC1155{
    mapping(uint => string) public tokenUri;
    uint count;
    string public name;
    string public symbol;

    constructor()ERC1155(""){
        name = "test";
        symbol = "tst";
    }

    function _setTokenUri(uint id, string calldata newUri)private{
        tokenUri[id] = newUri;
    }

    function uri(uint id) public view override returns(string memory){
        return tokenUri[id];
    }

    function mint(uint _amount, string calldata _uri)external{
        count ++;
        _setTokenUri(count, _uri);
        _mint(msg.sender, count, _amount, "");
    }
}