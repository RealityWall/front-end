import React from 'react';

// Components
import Modal from 'react-modal';
import LoginForm from './LoginForm/LoginForm.jsx';
import ForgotPasswordForm from './ForgotPasswordForm.jsx';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    },
    overlay: {
        backgroundColor   : 'rgba(0, 0, 0, 0.45)'
    }
};

var LoginModal = React.createClass({

    getInitialState() {
        return {
            index: 0
        };
    },

    _showForgotPasswordForm () {
        this.setState({index: 1});
    },

    _onRequestClose (e) {
        this.setState({index: 0});
        this.props.onRequestClose(e);
    },

    _onLogin() {
        this._onRequestClose();
        // clear href if loginModalOpened = true
        let hashSplit = location.hash.split('?');
        if (hashSplit.length > 1) location.hash = hashSplit[0];
    },

    render () {
        let self = this;
        return (
            <Modal
                isOpen={self.props.isOpen}
                onRequestClose={self._onRequestClose}
                style={customStyles}
            >
                {self.state.index === 0 ? <LoginForm onPasswordForgottenClick={ self._showForgotPasswordForm } onLogin={self._onLogin}/> : null}
                {self.state.index === 1 ? <ForgotPasswordForm /> : null}
            </Modal>
        );
    }

});

export default LoginModal;
