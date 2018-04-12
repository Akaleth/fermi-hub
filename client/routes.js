//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Data from './components/Data';
import Register from './components/Register';
import Add from './components/Add';
import Login from './components/Login';
import Game from './components/Game';
import NavBar from './components/Navbar';

export const Routes = (props) => (
    <div>
        <NavBar {...props}/>
        <Switch>
            <Route exact path='/' render={() => <Game {...props}/>} />
            <Route exact path='/register' component={Register} {...props} />
            <Route exact path='/add' render={() => <Add {...props}/>} />
            <Route exact path='/login' render={() => <Login {...props}/>} />
        </Switch>
    </div>
);

export default Routes;
