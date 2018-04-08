//client/component/Register.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';

var querystring = require('querystring');

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            messageFromServer: ''
        }

        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        this.registerUser(this);
    }

    registerUser(e) {
        //e.preventDefault();
        axios.post('/login',
            querystring.stringify({
                username: e.state.username,
                email: e.state.email,
                password: e.state.password,
                passwordConfirm: e.state.passwordConfirm
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function(response) {
                e.setState({
                    messageFromServer: response.data
                });
            });

        this.setState({
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        });
    }

    handleTextChange(e) {
        if(e.target.name == "username") {
            this.setState({
                username: e.target.value
            });
        }

        if(e.target.name == "email") {
            this.setState({
                email: e.target.value
            });
        }

        if(e.target.name == "password") {
            this.setState({
                password: e.target.value
            });
        }

        if(e.target.name == "passwordConfirm") {
            this.setState({
                passwordConfirm: e.target.value
            });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onClick}>
                    <label>Username:</label><input type="text" name="username" value={this.state.username} onChange={this.handleTextChange} /> <br />
                    <label>Email:</label><input type="text" name="email" value={this.state.email} onChange={this.handleTextChange} /> <br />
                    <label>Password:</label><input type="password" name="password" value={this.state.password} onChange={this.handleTextChange} /> <br />
                    <label>Confirm Password:</label><input type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleTextChange} /> <br />

                    <input type="submit" value="Submit" />
                </form>
                <br />
                <p>{this.state.messageFromServer}</p>
            </div>
        )
    }
}

export default Register;
