import React from 'react';

// Components
import LoginForm from './LoginForm.jsx';
import SignInForm from './SignInForm.jsx';

var Header = React.createClass({

    render() {
        return (
            <div>
                Header
                { this.props.user.id ? 'logged' : ''}
                { !this.props.user.id ? <LoginForm/> : ''}
                { !this.props.user.id ? <SignInForm/> : ''}
            </div>
        );
    }

});

export default Header;
