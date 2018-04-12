import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class LoginNavs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.userData.username) {
            return null;
        }

        return (
            <ul className="nav navbar-nav">
                <li> <Link to="/login">Login</Link> </li>
                <li> <Link to="/register">Register</Link> </li>
            </ul>
        )
    }
}

export default LoginNavs;
