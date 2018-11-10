import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Account extends Component {
    

    render() {

        return (
            <div>
            <div className="container auth">
          <Link className="logo" to="/">Heike</Link>
          <form onSubmit={this.handleSubmit} >
          <div className="card account">
              <div className="header blue white-text center">
                  <div className="card-content">Login</div>
              </div>
              <div className="card-content account">
            <div className="row">
            <div>
            <div className="input-field col s12 username">
            <div className="validate title">Your Account
                </div>
               
                <input
                name="username"
                type="text"
                className="validate account"
                placeholder={username}
               />
            </div>
            <div className="input-field col s12 username">
            <div className="validate title">Your Wallet Address
                </div>
                <input
                name="username"
                type="text"
                className="validate account"
                placeholder={publicKey}
               />
            </div>
           
        </div>
         
            </div>
        </div>

          <div className="card-content account">
            <div className="row">
        
        <button type="submit" className="waves-effect waves-light btn account">Create BTC Wallet</button> 
        <button type="submit" className="waves-effect waves-light btn account">Send ETH</button> 

            </div>
        </div>
          </div>
          </form>
      </div>
        </div>
        );
    }
}

export default Account;