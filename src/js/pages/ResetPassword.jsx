import React from 'react';
import ActionCreator from '../actions/UserActionCreator';
import EventListener from '../mixins/EventListenerMixin';
import Constants from '../Constants';

module.exports = React.createClass({

    mixins: [EventListener(Constants.ActionTypes.RESET_PASSWORD)],
    onEvent(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
            this.refs.password.value = '';
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Requête male formée';
                    break;
                case 404:
                    errorMessage = 'Oops ! Le lien sur lequel vous avez cliqué a expiré.';
                    break;
                case 500: break;
            }
            this.setState({success: false, error: errorMessage});
        }
    },

    _submitResetPassword(e) {
        e.preventDefault();
        ActionCreator.resetPassword(this.props.token, this.refs.password.value);
    },

    render() {
        return (
            <div className="reset-password-tile">
                <form onSubmit={this._submitResetPassword}>
                    <h2 className="title">Réinitilisation de votre mot de passe</h2>
                    <span>nouveau mot de passe : </span><input type="password" ref="password" required/><br/>
                    <span>confirmer le nouveau mot de passe : </span><input type="password" ref="ICIIIIIIIIIIIIII" required/><br/>
                    <input type="submit" className="btn" value="Reinitialiser mon mot de passe"/>
                    <span className="success">{this.state.success ? ('Un mail de confirmation a été envoyé à ' + _emailRegistered) : null}</span>
                    <span className="error">{this.state.error}</span>
                </form>
            </div>
        );
    }

});
