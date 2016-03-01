import React from 'react';
import UserActionCreator from '../../actions/UserActionCreator';
import EventListenerMixin from '../../mixins/EventListenerMixin';
import Constants from '../../Constants';

module.exports = React.createClass({

    mixins: [EventListenerMixin(Constants.ActionTypes.UPDATE_PASSWORD)],
    onEvent(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Requête male formée';
                    break; // bad password
                case 403:
                    errorMessage = 'Oops ! L\'ancien mot de passe que vous avez fourni n\'est pas le bon !';
                    break;
                case 500: break; // problem
            }
            this.setState({success: false, error: errorMessage});
        }
    },

    _handleSubmit(e) {
        e.preventDefault();
        let oldPassword = this.refs.oldPassword.value;
        let newPassword = this.refs.newPassword.value;
        let newPasswordConfirm = this.refs.newPasswordConfirm.value;
        if (oldPassword && (newPassword == newPasswordConfirm))
            UserActionCreator.updatePassword(oldPassword, newPassword);
    },

    render() {
        return (
            <div className="settings-tile">
                <div className="title">
                    <i className="fa fa-lock"/> <span className="text">Votre Mot de Passe</span>
                </div>
                <form onSubmit={this._handleSubmit}>
                    <input type="text" ref="oldPassword" placeholder="Mot de passe actuel" required/>
                    <input type="text" ref="newPassword" placeholder="Nouveau mot de passe" required/>
                    <input type="text" ref="newPasswordConfirm" placeholder="Nouveau mot de passe (confirmation)" required/>
                    <input type="submit" className="btn" value="Mettre à jour"/>
                    {this.state.success ? 'SUCESS' : null}
                    {this.state.error}
                </form>
            </div>
        );
    }

});
