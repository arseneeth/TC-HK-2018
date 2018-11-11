import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';
import axios from 'axios';

import {C2C} from 'react-c2c';

const Web3 = require("web3"); //import web3
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/68129f951c4642c1925917657181237d")); //connect to testrpc
const lightwallet = require("eth-lightwallet"); //import light wallet for mnemonic phrase
const  pkutils = require('./lib/pkutils'); //import pkutils for mnemonic to privatekey

var mnemonic = lightwallet.keystore.generateRandomSeed(); // should it be const?
// var privateKey = pkutils.getPrivateKeyFromMnemonic(mnemonic);
// var keystore = web3.eth.accounts.privateKeyToAccount(privateKey);


class Register_2 extends Component {
    constructor() {
        super();

        this.state = {
            mnemonic:mnemonic,
            copied: false
        }

        
        // this.handleSubmit = this.handleSubmit.bind(this);
        
    }


    handleSubmit(e) {
        e.preventDefault();
var mnemonic = lightwallet.keystore.generateRandomSeed(); // should it be const?
var privateKey = pkutils.getPrivateKeyFromMnemonic(mnemonic);
var keystore = web3.eth.accounts.privateKeyToAccount(privateKey);

     
       axios.post('http://10.18.6.99:8888/api/v1/register',{
            name:localStorage.getItem('username'),
            wallet:keystore.address
             // need to add more data to send to the server
    
    })
    
    
    .then(function (res) {
        this.props.history.push('/login');

        localStorage.setItem("private_key", privateKey);
        localStorage.setItem("public_key", keystore.address);
        
        
      })
      

    }
    render() {
        return (
            <div>
                <div className="container auth">
              <Link className="logo" to="/">Heike</Link>
              <div className="card">
              <form onSubmit={this.handleSubmit}>
                  <div className="header blue white-text center">
                      <div className="card-content">12 Words Phrase</div>
                  </div>
                  <div className="phrase_alert">Please write down your mnemonic phrase, it is the only way to recover your account</div>
                  <div className="phrase">
                      {mnemonic}
                      <br/>
                      {/* key store : {keystore} */}
                  </div>
                  <div className="footer phrase">
                  <C2C
                    text={this.state.mnemonic}
                    render={({ copied, handleClick }) => copied
                  ? <button className="waves-effect waves-light btn phrase">Copied !</button>
                  : <button className="waves-effect waves-light btn phrase" onClick={handleClick}>Copy to clipboard</button>}
                     />
                   
                  {/* <Link to='/' className="waves-effect waves-light btn phrase">Copy Phrase</Link> */}
                  <button type="submit" className="waves-effect waves-light btn phrase">Done</button>
                  </div>
                  </form>
              </div>
          </div>
            </div>
        );
    }
}

export default Register_2;