const Web3 = require("web3"); //import web3
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); //connect to testrpc
const lightwallet = require("eth-lightwallet"); //import light wallet for mnemonic phrase
const  pkutils = require('./pkutils'); //import pkutils for mnemonic to privatekey

var mnemonic = lightwallet.keystore.generateRandomSeed(); // should it be const?
var privateKey = pkutils.getPrivateKeyFromMnemonic(mnemonic);
var keystore = web3.eth.accounts.privateKeyToAccount(privateKey);

console.log("mnemonic: " + mnemonic);
console.log("keystore: " + keystore);