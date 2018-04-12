import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NavBar from './Navbar';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.userData.username) {
            return (
                <div>
                    <p id="username">logged in as: {this.props.userData.username}</p>
                </div>
            )
        }
        return null;
    }
}

export default Header;
