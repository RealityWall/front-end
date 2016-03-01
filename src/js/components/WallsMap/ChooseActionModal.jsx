import React from 'react';
import Constants from '../../Constants';

// Components
import Modal from 'react-modal';

var ChooseActionModal = React.createClass({

    render () {
        let self = this;
        return (
            <Modal
                isOpen={self.props.isOpen}
                onRequestClose={self.props.onRequestClose}
                style={Constants.MODAL_STYLE}
            >
                <div className="choosing-modal">
                    <a href={"#!/walls/" + this.props.wallId}>
                        <div className="icon"><i className="fa fa-picture-o"/></div>
                        <div className="title">Accéder à la gallerie</div>
                    </a>
                    <a href={"#!/walls/" + this.props.wallId + "/upload"}>
                        <div className="icon"><i className="fa fa-upload"/></div>
                        <div className="title">Mettre une photo en ligne</div>
                    </a>
                    <a href={"#!/walls/" + this.props.wallId + "/posts"}>
                        <div className="icon"><i className="fa fa-list"/></div>
                        <div className="title">Voir la liste des messages</div>
                    </a>
                </div>
                <div className="choosing-modal-cancel">
                    <button className="btn" onClick={self.props.onRequestClose}>Annuler</button>
                </div>
            </Modal>
        );
    }

});

export default ChooseActionModal;
