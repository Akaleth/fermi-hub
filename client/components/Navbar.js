import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="nav">
                <div className="navbar" id="head-navbar">
                    <ul className="nav navbar-nav">
                        <li> <Link to="/">Home</Link> </li>
                        <li> <Link to="/login">Login</Link> </li>
                        <li> <Link to="/register">Register</Link> </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;
