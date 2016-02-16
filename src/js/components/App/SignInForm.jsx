import React from 'react';
import UserActionCreator from '../../actions/UserActionCreator';

var Header = React.createClass({

    getInitialState() {
        return {
            error: null,
            success: false
        };
    },

    componentDidMount() { document.addEventListener('SignIn', this._onSignIn); },
    componentWillUnmount() { document.removeEventListener('SignIn', this._onSignIn); },
    _onSignIn(e) {
        console.log('singin coucou',e);
        if (e.status == 'success') {
            this.setState({success: true});
        } else {
            // TODO : switch
            this.setState({error: e});
        }
    },

    _handleSignIn(e) {
        e.preventDefault();
        let firstname = this.refs.firstname.value;
        let lastname = this.refs.lastname.value;
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        if (firstname && lastname && email && password) {
            UserActionCreator.signin(firstname, lastname, email, password);
        }
    },

    render() {
        let self = this;
        return (
            <form onSubmit={ self._handleSignIn }>
                <input type="text" placeholder="firstname" ref="firstname"/>
                <input type="text" placeholder="lastname" ref="lastname"/>
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
