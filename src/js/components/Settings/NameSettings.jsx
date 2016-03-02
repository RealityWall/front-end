import React from 'react';
import UserActionCreator from '../../actions/UserActionCreator';
import EventListenerMixin from '../../mixins/EventListenerMixin';
import Constants from '../../Constants';

module.exports = React.createClass({

    mixins: [EventListenerMixin(Constants.ActionTypes.UPDATE_NAME)],
    onEvent(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
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

    _handleSubmit(e) {
        e.preventDefault();
        let firstname = this.refs.firstname.value.trim();
        let lastname = this.refs.lastname.value.trim();
        if (firstname && lastname)
            UserActionCreator.updateName(firstname, lastname);
    },

    render() {
        return (
            <div className="settings-tile">
                <div className="title">
                    <i className="fa fa-user"/> <span className="text">Votre Prénom et Nom</span>
                </div>
                <form onSubmit={this._handleSubmit}>
                    <input type="text" ref="firstname" placeholder="Votre prénom" defaultValue={this.props.user.firstname} required/>
                    <input type="text" ref="lastname" placeholder="Votre nom" defaultValue={this.props.user.lastname} required/>
                    <span className="success">{this.state.success ? ('Vos informations ont bien été modifiées') : null}</span>
                    <span className="error">{this.state.error}</span>
                    <input type="submit" className="btn" value="Mettre à jour"/>
                </form>
            </div>
        );
    }

});
