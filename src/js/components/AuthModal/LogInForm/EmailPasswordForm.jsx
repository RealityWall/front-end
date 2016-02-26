import React from 'react';
import UserActionCreator from '../../../actions/UserActionCreator';
import EventListenerMixin from '../../../mixins/EventListenerMixin';
import Constants from '../../../Constants';

var EmailPasswordForm = React.createClass({

    mixins: [EventListenerMixin(Constants.ActionTypes.LOGIN)],
    onEvent(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
            //this.props.onLogin();
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Mauvais mail / mot de passe';
                    break; // bad email or bad password
                case 401:
                    errorMessage = 'Oops ! Le mot de passe entré n\'est pas valide.';
                    break; // password mismatch or not verified
                case 404:
                    errorMessage = 'Oops ! Le mail que vous avez entré ne correspond à aucun utilisateur.';
                    break; // user not found (email)
                case 500: break;
            }
            this.setState({success: false, error: errorMessage});
        }
    },

    _handleLogin(e) {
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        if (email && password) {
            UserActionCreator.login(email, password);
        }
    },

    render () {
        let self = this;
        return (
            <form onSubmit={ self._handleLogin }>
                <div><input type="email" placeholder="Votre adresse mail" ref="email" required/></div>
                <div><input type="password" placeholder="Mot de passe" ref="password" required/></div>

                <a className="forgotten-password" onClick={ self.props.onPasswordForgottenClick }>Mot de passe oublié ?</a>
                <div>
                    <input type="submit" className="btn" value="Connexion" />
                </div>

                {self.state.success ? 'SUCCESS':''}
                {self.state.error}
            </form>
        );
    }

});

export default EmailPasswordForm;
