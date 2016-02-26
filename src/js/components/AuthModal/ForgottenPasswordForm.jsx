import React from 'react';

const ForgottenPasswordForm = React.createClass({
    _handleForgottenPassword(e) {
        e.preventDefault();
    },

    render () {
        let self = this;
        return (
            <form onSubmit={ self._handleForgottenPassword }>
                <div><input type="email" placeholder="Votre adresse mail" ref="email" required/></div>

                <div>
                    <button className="btn">
                        <i className="fa fa-envelope-o" /> Envoyez à votre adresse mail
                    </button>
                </div>
            </form>
        );
    }
});

export default ForgottenPasswordForm;
