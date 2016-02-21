import React from 'react';
import UserActionCreator from '../../../actions/UserActionCreator';

var FacebookForm = React.createClass({

    getInitialState() {
        return {
            error: null,
            success: false
        };
    },

    componentDidMount() { document.addEventListener('LoginWithFacebook', this._onLogin); },
    componentWillUnmount() { document.removeEventListener('LoginWithFacebook', this._onLogin); },
    _onLogin(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
            this.props.onLogin();
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 409:
                    errorMessage = 'Oops ! L\'adresse mail de votre compte Facebook est déjà utilisé.';
                    break; // user not found (email)
                case 500: break;
                default: errorMessage = 'Oops ! Erreur lors de la connexion à Facebook.';
            }
            this.setState({success: false, error: errorMessage});
        }
    },

    _handleFacebookLogin() {
        // FB request
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                UserActionCreator.loginWithFacebook(response.authResponse.accessToken, response.authResponse.userID);
            } else {
                FB.login(function (data) {
                    UserActionCreator.loginWithFacebook(data.authResponse.accessToken, data.authResponse.userID);
                }, {scope: 'email'});
            }
        });
    },

    render () {
        let self = this;
        return (
            <div>
                <a className="facebook-btn" onClick={ self._handleFacebookLogin }>
                    <i className="fa fa-facebook-f"/> Connexion avec Facebook
                </a>
                <br/>
                {self.state.success ? 'SUCCESS':''}
                {self.state.error}
            </div>
        );
    }

});

export default FacebookForm;
