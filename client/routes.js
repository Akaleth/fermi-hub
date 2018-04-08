//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Register from './components/Register';
import Add from './components/Add';

export const Routes = () => (
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/add' component={Add} />
    </Switch>
);

export default Routes;
