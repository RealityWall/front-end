import React from 'react';

// Components
import UserMenu from './UserMenu.jsx';
import AuthModal from '../AuthModal/AuthModal.jsx';

var Header = React.createClass({

    getInitialState() {
        return {
            modalIsOpen: false
        }
    },

    _openModal(index) {
        this.refs.authModal.openModal(index);
    },

    _closeModal() {
        this.refs.authModal.openModal(-1);
    },

    render() {
        let self = this;
        return (
            <div id="header">
                <div className={"header-content " + (self.props.user.id ? "logged":"")}>
                    <a href="/"><img src="img/full-logo.png" alt="main logo"/></a>
                    <a href="/"><img src="img/logo.png" alt="main logo"/></a>
                    { self.props.user.id ? null : <a className="btn" id="sign-in" onClick={ () => self._openModal(1) }>Inscription</a> }
                    { self.props.user.id ? null : <a className="btn transparent" id="login" onClick={ () => self._openModal(0) }>Connexion</a> }
                    { self.props.user.id ? <UserMenu user={ self.props.user }/> : null}
                </div>
                <AuthModal ref="authModal"/>
            </div>
        );
    }

});

export default Header;
