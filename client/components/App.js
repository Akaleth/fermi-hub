//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header'
import { HashRouter } from 'react-router-dom'
import Routes from '../routes'

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            userData: {
                username:'',
                token:''
            },
        };

        //this.updateUserData = this.updateUserData.bind(this);
    }

    /*updateUserData = (data) => {
        this.setState({
            userData: {
                username: data.username
            }
        })
    }*/

    /*updateUserData(e, data) {
        e.setState({
            userData: {
                username: data.username
            }
        });
    }*/

    render() {
        return (
            <div>
                <Header onUpdateUser={(data) => this.setState({userData: { username:data.username }})} userData={this.state.userData} />
                <HashRouter>
                    <Routes onUpdateUser={(data) => this.setState({userData: { username:data.username }})} userData={this.state.userData} />
                </HashRouter>
            </div>
        );
    }
}
