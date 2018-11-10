import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class Header extends Component {
 
    render() {
      const loginButton = (
          <li>
              <Link to="/login">
                  <i className="material-icons">vpn_key</i>
              </Link>
          </li>
      );
      const logoutButton = (
          <li>
              <a>
                  <i className="material-icons">lock_open</i>
              </a>
          </li>
      );
      return (
        <div>
          <nav>
              <div className="nav-wrapper blue darken-1">
                  <Link to ="/" className="brand-logo center">Heike</Link>
 
                  <ul>
                      <li><a onClick={this.toggleSearch}><i className="material-icons">search</i></a></li>
                  </ul>
 
                  <div className="right">
                      <ul>
                          { loginButton }
                          { logoutButton }
                      </ul>
                  </div>
              </div>
          </nav>
        </div>
      );
    }
}
 
export default Header;
