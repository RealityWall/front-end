import React from 'react';

// Components
import EmailPasswordForm from './EmailPasswordForm.jsx';
import FacebookForm from './FacebookForm.jsx';

var LoginForm = React.createClass({

    render () {
        let self = this;
        return (
            <div className="login-forms-wrapper">
                <EmailPasswordForm onPasswordForgottenClick={ self.props.onPasswordForgottenClick } onLogin={ self.props.onLogin }/>
                <hr/>
                <FacebookForm onLogin={ self.props.onLogin }/>
            </div>
        );
    }

});

export default LoginForm;
