import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './index.css';

import 'tachyons';
import '@material-ui/core';

import {BrowserRouter as Router, Route} from "react-router-dom";
import LogIn from './components/app/logIn'

ReactDOM.render( <Router>
    <div className="app" >
        <Route exact path="/" component={App} /> {/*//path to protected resources available only with login*/}
        <Route exact path="/login" component={LogIn} /> {/*//redirect here without login*/}
        {/*TODO<Route exact path="/home/admin" component={Admin} />*/}
    </div>
</Router>, document.getElementById('root'));


