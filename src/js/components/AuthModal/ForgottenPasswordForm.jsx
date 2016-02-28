import React from 'react';
import EventListener from '../../mixins/EventListenerMixin';
import Constants from '../../Constants';
import ActionCreator from '../../actions/UserActionCreator';

const ForgottenPasswordForm = React.createClass({

    mixins:[EventListener(Constants.ActionTypes.FORGET_PASSWORD)],
    onEvent(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Requête male formée';
                    break; // bad email or bad password
                case 401:
                    errorMessage = 'Oops ! Vous devez vérifier votre adresse mail avant de demander un nouveau mot de passe.';
                    break; // bad email or bad password
                case 403:
                    errorMessage = 'Oops ! Vous ne pouvez pas demander un nouveau mot de passe pour ce compte car vous vous êtes connecté avec Facebook.';
                    break; // bad email or bad password
                case 404:
                    errorMessage = 'Oops ! Nous n\'avons pas trouvé votre adresse mail.';
                    break; // bad email or bad password
                case 500: break; // problem
            }
            this.setState({success: false, error: errorMessage});
        }
    },

    _handleForgottenPassword(e) {
        e.preventDefault();
        ActionCreator.forgetPassword(this.refs.email.value);
    },

    render () {
        let self = this;
        return (
            <form onSubmit={ self._handleForgottenPassword }>
                <div><input type="email" placeholder="Votre adresse mail" ref="email" required/></div>

                <div>
                    <span className="success">{self.state.success ? ('Un email contenant un lien pour mettre à jour votre mot de passe vient de vous etre envoyé.') : null}</span>
                    <span className="error">{self.state.error}</span>
                    <button className="btn">
                        <i className="fa fa-envelope-o" /> Reinitialiser votre mot de passe
                    </button>
                </div>


            </form>
        );
    }
});

export default ForgottenPasswordForm;
