import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Multi_Wallet extends Component {
    render() {
        return (
            <div>
            <div className="container auth">
          <Link className="logo" to="/">Heike</Link>
          <form onSubmit={this.handleSubmit} >
          <div className="card account">
              <div className="header blue white-text center">
                  <div className="card-content">Multi-Wallet Accounts</div>
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
                placeholder={localStorage.getItem('username')}
               />
            </div>
            <div className="input-field col s12 username">
            <div className="validate title">Your ETH Wallet Address
                </div>
                <input
                name="username"
                type="text"
                className="validate account"
                placeholder={localStorage.getItem('public_key')}
               />
            </div>
            <div className="input-field col s12 username">
            <div className="validate title">Your BTC Wallet Address
                </div>
                <input
                name="username"
                type="text"
                className="validate account"
                placeholder={localStorage.getItem('btc_wallet')}
               />
            </div>
           
        </div>
         
            </div>
        </div>

          <div className="card-content multi">
            <div className="row">
        
        <button type="submit" className="waves-effect waves-light btn account">Send BTC</button> 
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

export default Multi_Wallet;