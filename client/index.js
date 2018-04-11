//client/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import Routes from './routes'
import Header from './components/Header'

const UserContext = React.createContext('test');

ReactDOM.render(
    <div>
        <UserContext.Provider value="test">
            <Header />
            <HashRouter>
                <Routes />
            </HashRouter>
        </UserContext.Provider>
    </div>, document.getElementById('root')
);
