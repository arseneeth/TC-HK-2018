pragma solidity ^0.4.24;

contract authStorage{
    
    struct Account{
        
        // bytes32 name;
        // bytes32 id;
        address wallet;
    }
    
    mapping (bytes32 => Account) accounts;

    bytes32[] public ids;

    function _innit(bytes32 _name, address _wallet) private { 
        Account storage account = accounts[_name];
        
        // account.id = _id;
        account.wallet = _wallet;
        
        ids.push(_name) -1;
    }
 
     function getAccounts() view public returns(bytes32[]){ 
        return ids;
    }

    function _getWallet(bytes32 _id) view private returns(address){ 
        return (accounts[_id].wallet);
    }
    
    function signUp(bytes32 _name, address _wallet) public {
        require(_getWallet(_name) == 0x0000000000000000000000000000000000000000,
                "ERROR: User name already exists");
        _innit(_name, _wallet);
    }
 
    function signIn(bytes32 _id) public returns(address) {
        require(_getWallet(_id) != 0x0000000000000000000000000000000000000000,
                "ERROR: User does not exist");
        address walletAddress = _getWallet(_id);
        return walletAddress;
    }
 
}