import React from 'react';
import UserActionCreator from '../../actions/UserActionCreator';

module.exports = React.createClass({

    getInitialState() {
        return {
            error: null,
            success: false
        };
    },

    componentDidMount() { document.addEventListener('UpdateName', this._onUpdateName); },
    componentWillUnmount() { document.removeEventListener('UpdateName', this._onUpdateName); },
    _onUpdateName(e) {
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
            <form onSubmit={this._handleSubmit}>
                <input type="text" ref="firstname" placeholder="Votre prénom" defaultValue={this.props.user.firstname} required/>
                <input type="text" ref="lastname" placeholder="Votre nom" defaultValue={this.props.user.lastname} required/>
                <input type="submit" className="btn" value="Mettre à jour"/>
                {this.state.success ? 'SUCESS' : null}
                {this.state.error}
            </form>
        );
    }

});
