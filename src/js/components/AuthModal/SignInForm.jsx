import React from 'react';
import UserActionCreator from '../../actions/UserActionCreator';
import Constants from '../../Constants';
import EventListenerMixin from '../../mixins/EventListenerMixin';

let _emailRegistered = null;

var SignInForm = React.createClass({

    mixins: [EventListenerMixin(Constants.ActionTypes.SIGNIN)],
    onEvent(e) {
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
                <input type="text" placeholder="Nom" ref="lastname" required/>
                <input type="text" placeholder="Prenom" ref="firstname" required/>
                <input type="email" placeholder="Adresse mail" ref="email" required/>
                <input type="password" placeholder="Mot de passe" ref="password" required/>
                <span className="success">{self.state.success ? ('Un mail de confirmation a été envoyé à ' + _emailRegistered) : null}</span>
                <span className="error">{self.state.error}</span>
                <input type="submit" className="btn" value="s'inscrire"/>


            </form>
        );
    }

});

export default SignInForm;
