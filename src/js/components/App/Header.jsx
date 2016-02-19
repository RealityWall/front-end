import React from 'react';

// Components
import UserMenu from './UserMenu.jsx';
import LoginModal from '../LoginModal/LoginModal.jsx';

var Header = React.createClass({

    getInitialState() {
        return {
            modalIsOpen: false
        }
    },

    _openModal: function() {
        this.setState({modalIsOpen: true});
    },

    _closeModal: function() {
        this.setState({modalIsOpen: false});
    },

    render() {
        let self = this;
        return (
            <div id="header">
                <div className={"header-content " + (self.props.user.id ? "logged":"")}>
                    <a href="/"><img src="img/full-logo.png" alt="main logo"/></a>
                    <a href="/"><img src="img/logo.png" alt="main logo"/></a>
                    { self.props.user.id ? null : <a href="/sign-in" className="btn" id="sign-in">Inscription</a> }
                    { self.props.user.id ? null : <a className="btn transparent" id="login" onClick={ self._openModal }>Connexion</a> }
                    { self.props.user.id ? <UserMenu user={ self.props.user }/> : null}
                </div>
                <LoginModal
                    isOpen={self.state.modalIsOpen}
                    onRequestClose={self._closeModal}
                    />
            </div>
        );
    }

});

export default Header;
