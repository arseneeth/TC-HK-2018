import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import {Register,Login} from './pages';
import Header from '../ components/Header/Header';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <div>
                         <Header />
                        <Route exact path='/' component = {Register}/>
                        <Route exact path='/login' component = {Login}/>
                    </div>
                </Switch>
                
            </div>
        );
    }
}

export default App;