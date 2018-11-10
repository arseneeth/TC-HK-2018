import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';

class Register extends Component {
    render() {
        return (
            <div>
                <div className="container auth">
              <Link className="logo" to="/">Heike</Link>
              <div className="card">
                  <div className="header blue white-text center">
                      <div className="card-content">Register</div>
                  </div>
                  <div className="card-content">
                  <form></form>
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
                    <Link to='/register_2' className="waves-effect waves-light btn">CREATE</Link> 
                </div>
            </div>
              </div>
          </div>
            </div>
        );
    }
}

export default Register;