//client/component/Register.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Link} from 'react-router-dom';

var querystring = require('querystring');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            messageFromServer: '',
            toIndex: false,
        };

        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.login = this.login.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        this.login(this);
    }

    login(e) {
        //e.preventDefault();
        axios.post('/login',
            querystring.stringify({
                username: e.state.username,
                password: e.state.password,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                // login failed
                if(response.status == 401) {
                    e.setState({
                        messageFromServer: response.data
                    });
                }
                // login succeeded
                else if(response.status == 200) {
                    e.setState({
                        toIndex: true
                    });
                    //window.sessionStorage.setItem('user', response.data);
                    e.props.onUpdateUser({username:response.data.data});
                }
            });
    }

    handleTextChange(e) {
        if(e.target.name == "username") {
            this.setState({
                username: e.target.value
            });
        }

        if(e.target.name == "password") {
            this.setState({
                password: e.target.value
            });
        }
    }

    render() {
        if(this.state.toIndex) {
            return ( <Redirect to="/" /> )
        }
        return (
            <div>
                <form onSubmit={this.onClick}>
                    <label>Username:</label><input type="text" name="username" value={this.state.username} onChange={this.handleTextChange} /> <br />
                    <label>Password:</label><input type="password" name="password" value={this.state.password} onChange={this.handleTextChange} /> <br />

                    <input type="submit" value="Login" />
                </form>
                <br />
                <p>{this.state.messageFromServer}</p>
            </div>
        )
    }
}

export default Login;
