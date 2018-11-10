import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';



class Register extends Component {
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
        console.log(this.state.username);
        const cachedHits = localStorage.setItem("username", this.state.username); // maybe we will change it later
        console.log(localStorage);
        if (cachedHits) {
            this.setState({ username: JSON.parse(cachedHits) });
            console.log("local storage :" + cachedHits );
            return;
          }
        this.props.history.push('/register_2');


    }
    render() {
        return (
            <div>
                <div className="container auth">
              <Link className="logo" to="/">Heike</Link>
              <form onSubmit={this.handleSubmit} >
              <div className="card">
                  <div className="header blue white-text center">
                      <div className="card-content">Register</div>
                  </div>
                  <div className="card-content">
                  <form></form>
                <div className="row">
                <div>
                <div className="input-field col s12 username">
                    
                    <input
                    name="username"
                    type="text"
                    className="validate"
                    placeholder="Enter Your Username"
                    onChange={this.handleChange} 
                    value={this.state.username}/>
                     
                </div>
            </div>
               
                    <button type="submit" className="waves-effect waves-light btn">CREATE</button> 
              
                </div>
            </div>
              </div>
              </form>
          </div>
            </div>
        );
    }
}

export default Register;