import React from 'react';
import UserActionCreator from '../../actions/UserActionCreator';

var LoginForm = React.createClass({

    _handleForgottenPassword(e) {
        e.preventDefault();
    },

    render () {
        let self = this;
        return (
            <div className="login-modal-wrapper modal-content">
                <div className="header">Connexion à votre compte</div>
                <form onSubmit={ self._handleForgottenPassword }>
                    <div><input type="email" placeholder="Votre adresse mail" ref="email" required/></div>

                    <div>
                        <button className="btn">
                            <i className="fa fa-envelope-o"></i> Envoyez à votre adresse mail
                        </button>
                    </div>
                </form>
            </div>
        );
    }

});

export default LoginForm;
