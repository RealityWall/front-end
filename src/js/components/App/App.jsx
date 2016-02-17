import React from 'react';

// Components
import Header from './Header.jsx';
import LoginForm from './LoginForm.jsx';
import SignInForm from './SignInForm.jsx';

var App = React.createClass({

    render() {
        // TODO : loading
        return (
            <div id="app-container">
                <Header user={ this.props.user }/>

                <div id="app-body">
                    { this.props.user.id ? 'logged' : ''}
                    { !this.props.user.id ? <LoginForm/> : ''}
                    { !this.props.user.id ? <SignInForm/> : ''}
                    { this.props.children }
                </div>
            </div>
        );
    }

});

export default App;
