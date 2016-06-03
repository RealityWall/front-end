import React from 'react';
import Constants from '../../Constants';
import EventListenerMixin from '../../mixins/EventListenerMixin';
import ActionCreator from '../../actions/PostActionCreator';
import PostStore from '../../stores/PostStore';

// Components
import Modal from 'react-modal';

var AddPostModal = React.createClass({

    getInitialState() {
        return {
            index: 0,
            message: ''
        }
    },

    closeModal() {
        this.setState({index: -1});
    },

    mixins: [EventListenerMixin(Constants.ActionTypes.ADD_POST)],
    onEvent(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
            setTimeout(() => {
                this.props.onRequestClose(false);
            }, 2000);
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Votre message ne convient pas.';
                    break; // bad email or bad password
                case 409:
                    errorMessage = 'Oops ! vous avez déjà posté aujourd\'hui.';
                    break; // password mismatch or not verified
                case 404:
                    errorMessage = 'Oops ! Le mur demandé n\'existe pas.';
                    break; // user not found (email)
                case 500:
                    break;
            }
            this.setState({success: false, error: errorMessage});
        }
    },

    _messageChange() {
        if (this.refs.content.value.length > 280) this.refs.content.value = this.refs.content.value.substr(0, 280);
        this.setState({message: this.refs.content.value});
    },

    _addPost(e) {
        e.preventDefault();
        this.refs.content.value && ActionCreator.addPost(this.props.wallId, this.refs.content.value);
    },

    render () {
        let self = this;
        return (
            <Modal
                isOpen={self.props.isOpen}
                onRequestClose={() => self.props.onRequestClose(true)}
                style={Constants.MODAL_STYLE}
            >
                <div className="postModal">
                    <div className="auth-modal-close" onClick={() => self.props.onRequestClose(true)}>&times;</div>
                    <div className="title">poster un message</div>
                    <form onSubmit={ self._addPost }>
                        <textarea required ref="content" placeholder="Ton message" onChange={this._messageChange}/><br/>
                        <span
                            className="success">{self.state.success ? ('Bravo ! Votre message sera affiché demain !') : null}</span>
                        <span className="error">{self.state.error}</span>
                        <div className="bottom-container">
                            <span className="info">{this.state.message.length} / 280</span>
                            <input type="submit" value="Envoyer ce message" className="btn"/>
                        </div>

                    </form>
                </div>
            </Modal>
        );
    }

});

export default AddPostModal;
