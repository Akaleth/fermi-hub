//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Register from './components/Register';

export const Routes = () => (
    <Switch>
        <Route exact path='/' component={App} />
        //<Route exact path='/register' component={Register} />
    </Switch>
);

export default Routes;
