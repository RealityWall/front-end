import React from 'react';

// Components
import UserMenu from './UserMenu.jsx';

var Header = React.createClass({

    render() {
        console.log(this.props.user);
        return (
            <div id="header">
                <div className={"header-content " + (this.props.user.id ? "logged":"")}>
                    <a href="/"><img src="img/full-logo.png" alt="main logo"/></a>
                    <a href="/"><img src="img/logo.png" alt="main logo"/></a>
                    { this.props.user.id ? null : <a href="/sign-in" className="btn" id="sign-in">Inscription</a> }
                    { this.props.user.id ? null : <a className="btn transparent" id="login">Connexion</a> }
                    { this.props.user.id ? <UserMenu user={ this.props.user }/> : null}
                </div>
            </div>
        );
    }

});

export default Header;
