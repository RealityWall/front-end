import React from 'react';
import UserActionCreator from '../../actions/UserActionCreator';

let _emailRegistered = null;

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
            _emailRegistered = this.refs.email.value;
            this.setState({success: true, error: null});
            this.refs.firstname.value = '';
            this.refs.lastname.value = '';
            this.refs.email.value = '';
            this.refs.password.value = '';
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Requête male formée';
                    break; // bad email or bad password
                case 409:
                    errorMessage = 'Oops ! Cette addresse mail est déjà utilisé.';
                    break; // bad email or bad password
                case 500: break; // problem
            }
            this.setState({success: false, error: errorMessage});
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
                <input type="text" placeholder="firstname" ref="firstname" required/>
                <input type="text" placeholder="lastname" ref="lastname" required/>
                <input type="email" placeholder="email" ref="email" required/>
                <input type="password" placeholder="password" ref="password" required/>
                <input type="submit" className="btn"/>

                {self.state.success ? ('Un mail de confirmation a été envoyé à ' + _emailRegistered) : null}
                {self.state.error}
            </form>
        );
    }

});

export default Header;