import React from 'react';
import Modal from 'react-modal';
import Constants from '../../Constants';

import LogInForm from './LogInForm/LogInForm.jsx';
import SignInForm from './SignInForm/SignInForm.jsx';
import ForgottenPasswordForm from './ForgottenPasswordForm.jsx';

const tabs = [
    {faIcon: 'lock', name: 'Connexion'},
    {faIcon: 'sign-in', name: 'Inscription'},
    {faIcon: 'key', name: 'Mot de passe oublié'}
];

const AuthModal = React.createClass({

    getInitialState() {
        return {
            index: 0
        }
    },

    openModal(index) {
        this.setState({index});
    },

    closeModal() {
        this.setState({index: -1});
    },

    render() {
        let self = this;
        return (
            <Modal
                isOpen={self.state.index >= 0}
                onRequestClose={self.closeModal}
                style={Constants.MODAL_STYLE}
            >
                <div className="auth-modal-close" onClick={self.closeModal}>&times;</div>
                <div className="auth-modal-tabs">
                    {
                        tabs.map((tab, index) => {
                            return (
                                <div
                                    key={index}
                                    className={"tab" + (self.state.index === index ? " selected ": "")}
                                    onClick={() => self.openModal(index)}
                                >
                                    <div className="tab-icon"><i className={"fa fa-" + tab.faIcon}/></div>
                                    <div className="tab-name">{ tab.name }</div>
                                </div>
                            );
                        })
                    }
                </div>
               <div className={"auth-modal-content " + self.state.index}>
                   { self.renderForm() }
               </div>
            </Modal>
        );
    },

    renderForm() {
        if (this.state.index === 0) {
            return (<LogInForm />);
        } else if (this.state.index === 1) {
            return (<SignInForm />);
        } else if (this.state.index === 2) {
            return (<ForgottenPasswordForm />);
        }
    }

});

export default AuthModal;
