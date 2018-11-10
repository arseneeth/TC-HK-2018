import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import {Register,Login,Register_2, Account, Multi_Wallet} from './pages';
import Header from '../ components/Header/Header';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <div>
                         <Header />
                        <Route exact path='/' component = {Register}/>
                        <Route exact path='/register_2' component = {Register_2}/>
                        <Route exact path='/login' component = {Login}/>
                        <Route exact path='/account' component = {Account}/>
                        <Route exact path='/multi_wallet' component = {Multi_Wallet}/>
                    </div>
                </Switch>
                
            </div>
        );
    }
}

export default App;