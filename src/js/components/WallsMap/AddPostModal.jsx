import React from 'react';
import Constants from '../../Constants';
import EventListenerMixin from '../../mixins/EventListenerMixin';
import ActionCreator from '../../actions/PostActionCreator';

// Components
import Modal from 'react-modal';

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

var AddPostModal = React.createClass({

    getInitialState() {
        return {
            error: null,
            success: false
        };
    },

    mixins: [EventListenerMixin(Constants.ActionTypes.ADD_POST)],
    onEvent(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
            setTimeout(() => {
                this.props.onRequestClose(false);
            }, 1000);
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
                case 500: break;
            }
            this.setState({success: false, error: errorMessage});
        }
    },

    _addPost(e) {
        e.preventDefault();
        ActionCreator.addPost(this.props.wallId, this.refs.content.value);
    },

    render () {
        let self = this;
        return (
            <Modal
                isOpen={self.props.isOpen}
                onRequestClose={() => self.props.onRequestClose(true)}
                style={customStyles}
            >
                <form onSubmit={ self._addPost }>
                    <input type="text" placeholder="Ton message" required ref="content"/>
                    <input type="submit" className="btn"/>
                </form>
                {this.state.success ? 'SUCCESS':''}
                {this.state.error}
            </Modal>
        );
    }

});

export default AddPostModal;
