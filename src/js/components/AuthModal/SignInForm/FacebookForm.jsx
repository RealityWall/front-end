import React from 'react';
import UserActionCreator from '../../../actions/UserActionCreator';
import EventListenerMixin from '../../../mixins/EventListenerMixin';
import Constants from '../../../Constants';

var FacebookForm = React.createClass({

    mixins: [EventListenerMixin(Constants.ActionTypes.LOGIN_WITH_FACEBOOK)],
    onEvent(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
            //this.props.onLogin();
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
                    <i className="fa fa-facebook-f"/> Inscription avec Facebook
                </a>
                <br/>
                {self.state.success ? 'SUCCESS':''}
                {self.state.error}
            </div>
        );
    }

});

export default FacebookForm;
