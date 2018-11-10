import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';


// const Web3 = require("web3"); //import web3
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); //connect to testrpc
const lightwallet = require("eth-lightwallet"); //import light wallet for mnemonic phrase
const  pkutils = require('./lib/pkutils'); //import pkutils for mnemonic to privatekey

var mnemonic = lightwallet.keystore.generateRandomSeed(); // should it be const?
var privateKey = pkutils.getPrivateKeyFromMnemonic(mnemonic);
// var keystore = web3.eth.accounts.privateKeyToAccount(privateKey);

console.log("mnemonic: " + mnemonic);
// console.log("keystore: " + keystore);

class Register_2 extends Component {
    render() {
        return (
            <div>
                <div className="container auth">
              <Link className="logo" to="/">Heike</Link>
              <div className="card">
                  <div className="header blue white-text center">
                      <div className="card-content">12 Words Phrase</div>
                  </div>
                  <div>
                      {mnemonic}
                      <br/>
                      {/* {keystore} */}
                  </div>
               
              </div>
          </div>
            </div>
        );
    }
}

export default Register_2;