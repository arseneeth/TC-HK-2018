import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

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
        
       console.log('The form was submitted with the following data:');
     
       axios.post('http://10.18.6.99:8888/api/v1/login',{
            name:this.state.username,
            wallet:"0x4CC31F0D56865b02a46A01C606717B640f6AD1e6"
            // need to add more data to send to the server
    
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