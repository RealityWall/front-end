import React from 'react';

var Header = React.createClass({

    render() {
        return (
            <div id="header">
                <div className="header-content">
                    <a href="/"><img src="img/full-logo.png" alt="main logo"/></a>
                    <a href="/"><img src="img/logo.png" alt="main logo"/></a>
                    <a href="/sign-in" className="btn" id="sign-in">Inscription</a>
                    <a className="btn transparent" id="login">Connexion</a>
                </div>
            </div>
        );
    }

});

export default Header;
