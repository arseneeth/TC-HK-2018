import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';
import axios from 'axios';

const Web3 = require("web3"); //import web3
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/68129f951c4642c1925917657181237d")); //connect to testrpc
const lightwallet = require("eth-lightwallet"); //import light wallet for mnemonic phrase
const  pkutils = require('./lib/pkutils'); //import pkutils for mnemonic to privatekey

var mnemonic = lightwallet.keystore.generateRandomSeed(); // should it be const?
var privateKey = pkutils.getPrivateKeyFromMnemonic(mnemonic);
var keystore = web3.eth.accounts.privateKeyToAccount(privateKey);

console.log("mnemonic: " + mnemonic);
console.log("keystore: " + keystore);



class Register_2 extends Component {
    constructor() {
        super();

        // this.state = {
        // name:localStorage.username,
        // wallet:keystore
           
        // }

        
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        
       console.log('The form was submitted with the following data:');
      

       axios.post('http://10.18.6.99:8888/api/v1/register',{
            name:'joy',
            wallet:'0xa3b65Ba11F77F4B53A691fd722373D038418cDCE'
            // need to add more data to send to the server
    
    })
    
    
    .then(function (res) {
        
        if(res.data === 'ok'){
            console.log("success");
            
        }
      })
      .catch(function (error,data) {
        console.log(error);
        console.log('unauthorized, logging out ...');
        console.log(data);
       
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
                  <div className="phrase">
                      {mnemonic}
                      <br/>
                      {/* key store : {keystore} */}
                  </div>
                  <div className="footer phrase">
                  <Link to='/' className="waves-effect waves-light btn phrase">Copy Phrase</Link>
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