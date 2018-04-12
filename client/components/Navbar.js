import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoginNavs from './LoginNavs';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.LoginComponents = this.LoginComponents.bind(this);
    }

    LoginComponents(e) {
        if(e.props.userData.username) {
            return null;
        }
        return (
            <div>
                <li> <Link to="/login">Login</Link> </li>
                <li> <Link to="/register">Register</Link> </li>
            </div>
        )
    }

    render() {
        return (
            <nav className="nav">
                <div className="navbar" id="head-navbar">
                    <ul className="nav navbar-nav">
                        <li> <Link to="/">Home</Link> </li>
                        <LoginNavs {...this.props} />
                        <li> <Link to="/add">Submit Question</Link> </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;
