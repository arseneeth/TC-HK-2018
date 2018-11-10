import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div>
            <div className="container auth">
          <Link className="logo" to="/">Heike</Link>
          <div className="card">
              <div className="header blue white-text center">
                  <div className="card-content">Login</div>
              </div>
              <div className="card-content">
            <div className="row">
            <div>
            <div className="input-field col s12 username">
                <label>Username</label>
                <input
                name="username"
                type="text"
                className="validate"/>
            </div>
           
        </div>
        <Link to='/register' className="waves-effect waves-light btn">Login</Link> 
            </div>
        </div>
          </div>
      </div>
        </div>
        );
    }
}

export default Login;