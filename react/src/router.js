import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom'

import Login from './login'
import Home from './Home'

class RouterApp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <BrowserRouter>
            <div>
                <Route path='/login' exact component={Login}></Route>
                <Route path='/' exact component={Home}></Route>
            </div>
        </BrowserRouter>
         );
    }
}
 
export default RouterApp;