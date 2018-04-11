import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
        };

        this.getUser = this.getUser.bind(this);
    }

    componentDidMount() {
        this.setState({
            username: window.sessionStorage.user
        });
    }

    getUser(e) {
        /*axios.get('currentuser').then(function(res) {
            e.setState({
                username: res.data
            });
        });*/
    }

    render() {
        return (
            <UserContext.Consumer>
                {username => (
                    <p id="username" value={username} />
                )}
            </UserContext.Consumer>
        );
    }
}

export default Header;
