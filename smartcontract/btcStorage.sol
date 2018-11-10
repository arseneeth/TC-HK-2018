pragma solidity ^0.4.24;

import 'browser/authStorage.sol';

contract bitcoinStorage {
    
    authStorage public auth_storage = authStorage(0xbbf289d846208c16edc8474705c748aff07732db); // authStorage contract was deployed under this address
    
    struct btcWallet{
        bytes32 pub_hashed;
        bytes32 wif_hashed;
    }
    
    mapping (bytes32 => btcWallet) btc_wallets;
    
    function addWallet(bytes32 _id, bytes32 _pub, bytes32 _wif) public {
             require(auth_storage.testSignIn(_id) != 0x0000000000000000000000000000000000000000,
                "ERROR: User does not exist");

            
            btcWallet storage btc_wallet = btc_wallets[_id];

            btc_wallet.pub_hashed = _pub;
            btc_wallet.wif_hashed = _wif;
            
    }


    
}