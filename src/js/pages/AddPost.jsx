import React from 'react';
import Constants from '../Constants';
import ActionCreator from '../actions/PostActionCreator';
import PostStore from '../stores/PostStore';

module.exports = React.createClass({

    getInitialState() {
        return {
            error: null,
            success: false
        };
    },

    componentDidMount() { document.addEventListener(Constants.ActionTypes.ADD_POST, this._onPost); },
    componentWillUnmount() { document.removeEventListener(Constants.ActionTypes.ADD_POST, this._onPost); },
    _onPost(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Votre message ne convient pas.';
                    break; // bad email or bad password
                case 409:
                    errorMessage = 'Oops ! vous avez déjà posté aujourd\'hui.';
                    break; // password mismatch or not verified
                case 404:
                    errorMessage = 'Oops ! Le mur demandé n\'existe pas.';
                    break; // user not found (email)
                case 500: break;
            }
            this.setState({success: false, error: errorMessage});
        }
    },

    _handleSubmit(e) {
        e.preventDefault();
        ActionCreator.addPost(this.props.wallId, this.refs.content.value);
    },

    render() {
        return (
            <div>
                <form onSubmit={ this._handleSubmit }>
                    <input type="text" placeholder="Ton message" required ref="content"/>
                    <input type="submit" className="btn"/>
                </form>
                {this.state.success ? 'SUCCESS':''}
                {this.state.error}
            </div>
        );
    }

});
