import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Web3 = require("web3"); //import web3
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/68129f951c4642c1925917657181237d")); //connect to testrpc
const lightwallet = require("eth-lightwallet"); //import light wallet for mnemonic phrase
const  pkutils = require('./lib/pkutils'); //import pkutils for mnemonic to privatekey

var mnemonic = lightwallet.keystore.generateRandomSeed(); // should it be const?
var privateKey = pkutils.getPrivateKeyFromMnemonic(mnemonic);
// var keystore = web3.eth.accounts.privateKeyToAccount(privateKey);

console.log("mnemonic: " + mnemonic);
//console.log("keystore: " + keystore);


class Login extends Component {
    constructor() {
        super();

        this.state = {
           username:''
           
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {

        this.setState({
            username: e.target.value
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        const message = mnemonic;
        const pub_key = localStorage.getItem('pub_key');
        const hash = Web3.utils.keccak256(message);
        console.log("hash:", hash);

        const sign_message = web3.eth.sign(message,pub_key);
        console.log("sign message:", sign_message);

    
        axios.post('http://10.18.6.99:8888/api/v1/login',{
            name:this.state.username,
            message:message,
            hash:hash
    })
    
    .then(function (res) {
        console.log(res);
        console.log(res.data);

        
      })
      

    }
    render() {
        return (
            <div>
            <div className="container auth">
          <Link className="logo" to="/">Heike</Link>
          <form onSubmit={this.handleSubmit} >
          <div className="card">
              <div className="header blue white-text center">
                  <div className="card-content">Login</div>
              </div>
              <div className="card-content">
            <div className="row">
            <div>
            <div className="input-field col s12 username">
                
                <input
                name="username"
                type="text"
                className="validate"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.username}/>
            </div>
           
        </div>
        <button type="submit" className="waves-effect waves-light btn">Login</button> 
            </div>
        </div>
          </div>
          </form>
      </div>
        </div>
        );
    }
}

export default Login;