import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Web3 = require("web3"); //import web3
const web3 = new Web3(new Web3.providers.HttpProvider("http://ropsten.infura.io/v3/68129f951c4642c1925917657181237d")); //connect to testrpc
const lightwallet = require("eth-lightwallet"); //import light wallet for mnemonic phrase
const  pkutils = require('./lib/pkutils'); //import pkutils for mnemonic to privatekey

var message = lightwallet.keystore.generateRandomSeed(); // should it be const?
//var privateKey = pkutils.getPrivateKeyFromMnemonic(mnemonic);
// var keystore = web3.eth.accounts.privateKeyToAccount(privateKey);


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

        // const message = mnemonic;
        //const pub_key = localStorage.getItem('pub_key');
        const hash = Web3.utils.keccak256(message);
        console.log("hash:", hash);

        const sign_message = web3.eth.accounts.sign(message,localStorage.getItem('private_key2'));
        console.log('private_key2_from login:' + localStorage.getItem('private_key2'));
        
        const address = web3.eth.accounts.recover(sign_message);
        console.log("address:" + address);
        console.log("wallet", localStorage.getItem('pub_key2'));

        const accounts = web3.eth.accounts.privateKeyToAccount(localStorage.getItem('private_key2'));
        console.log("accounts_address:"+ accounts.address);
        console.log("accounts_privateKey:"+ accounts.privateKey);
        console.log("sign message:", sign_message);


        console.log(this.state.username);
        console.log(message);
        // console.log(web3.version);
       

    
        axios.post('http://10.18.6.99:8888/api/v1/login',{
            name:this.state.username,
            signature:sign_message.signature,
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