import React from 'react';
import UserActionCreator from '../../actions/UserActionCreator';

var Header = React.createClass({

    getInitialState() {
        return {
            error: null,
            success: false
        };
    },

    componentDidMount() { document.addEventListener('Login', this._onLogin); },
    componentWillUnmount() { document.removeEventListener('Login', this._onLogin); },
    _onLogin(e) {
        if (e.status == 'success') {
            this.setState({success: true});
        } else {
            // TODO : switch
            switch (e.res.status) {
                case 400: break; // bad email or bad password
                case 401: break; // password mismatch or not verified
                case 404: break; // user not found (email)
            }
            console.log(e.err, e.res);
            this.setState({error: e});
        }
    },

    _handleSignIn(e) {
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        if (email && password) {
            UserActionCreator.login(email, password);
        }
    },

    render() {
        let self = this;
        return (
            <form onSubmit={ self._handleSignIn }>
                <input type="email" placeholder="email" ref="email"/>
                <input type="password" placeholder="password" ref="password"/>
                <input type="submit"/>

                {self.state.success ? 'SUCCESS':''}
                {self.state.error ? 'ERROR':''}
            </form>
        );
    }

});

export default Header;
