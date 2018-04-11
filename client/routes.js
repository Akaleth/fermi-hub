//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Register from './components/Register';
import Add from './components/Add';
import Login from './components/Login';

const UserContext = React.createContext('');

export const Routes = () => (
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/add' component={Add} />
        <Route exact path='/login' component={Login} />
    </Switch>
);

export default Routes;
