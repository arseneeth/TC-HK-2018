pragma solidity ^0.4.24;

contract authStorage{
    
    struct Account{
        
        // bytes32 name;
        // bytes32 id;
        address wallet;
    }
    
    mapping (bytes32 => Account) accounts;

    bytes32[] public ids;

    function register(bytes32 _name, address _wallet) public { 
        Account storage account = accounts[_name];
        
        // account.id = _id;
        account.wallet = _wallet;
        
        ids.push(_name) -1;
    }
 
     function getAccounts() view public returns(bytes32[]){ 
        return ids;
    }

    function login(bytes32 _id) view public returns(address){ 
        return (accounts[_id].wallet);
    }
 
}