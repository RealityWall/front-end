import React from 'react';
import UserActionCreator from '../../actions/UserActionCreator';
import Constants from '../../Constants';
import Modal from 'react-modal';
import EventListenerMixin from '../../mixins/EventListenerMixin';
import AnimatedLoading from '../Loading/AnimatedLoading.jsx';

let cropper = null;

module.exports = React.createClass({

    getInitialState() {
        return {
            file: null,
            fileUrl: null,
            isCropModalOpened: false,
            loading: false
        };
    },

    mixins: [EventListenerMixin(Constants.ActionTypes.UPDATE_PICTURE)],
    onEvent(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null, loading: false});
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Requête male formée';
                    break; // bad email or bad password
                case 409:
                    errorMessage = 'Oops ! Cette addresse mail est déjà utilisé.';
                    break; // bad email or bad password
                case 500:
                    break; // problem
            }
            this.setState({success: false, error: errorMessage, loading: false});
        }
    },

    _handleSubmit() {
        let dataURL = cropper.getCroppedCanvas().toDataURL();
        let blobBin = atob(dataURL.split(',')[1]);
        let array = [];
        for (let i = 0; i < blobBin.length; i++) array.push(blobBin.charCodeAt(i));
        let file = new Blob([new Uint8Array(array)], {type: 'image/png'});
        UserActionCreator.updatePicture(file);
        this.setState({isCropModalOpened: false, loading: true});
    },

    _handleFile(e) {
        let self = this;
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                file: file,
                fileUrl: upload.target.result,
                isCropModalOpened: true
            });
            self._mountImage();
        };
        reader.readAsDataURL(file);
        this.refs.picture.value = '';
    },

    _delete() {
        UserActionCreator.deletePicture();
    },

    _mountImage() {
        cropper = new Cropper(document.getElementById('image'), {
            aspectRatio: 1,
            viewMode: 1,
            dragMode: 'move',
            response: true
        });
    },

    render() {
        return (
            <div className="settings-tile">
                <div className="title">
                    <i className="fa fa-camera"/> <span className="text">Votre Avatar</span>
                </div>
                <div className="picture-form">

                    <input type="file" ref="picture" placeholder="Votre photo de profil" required
                           accept="image/*"
                           onChange={this._handleFile}/>
                    <div className="profile-picture">
                        <img src={
                            this.props.user.imagePath
                                ? Constants.SERVER_IMAGES_URL + '/users/' + this.props.user.imagePath
                                : (
                                this.props.user.facebookId
                                    ? 'http://graph.facebook.com/' + this.props.user.facebookId + '/picture?type=square'
                                    : 'img/no_image_path.png'
                            )
                        }
                             alt="user profile image"
                             height="130"
                             title={this.props.user.firstname + ' ' + this.props.user.lastname}/>
                        <div className="overlay">
                            <i className="fa fa-upload"/>
                        </div>
                    </div>
                    <input type="submit" className="btn" value="Choisir un fichier" onClick={() => {
                        fireEvent(document.querySelector('.picture-form > input[type="file"]'), 'click');
                    }}/>
                    <input type="submit" className="btn delete-avatar" value="Supprimer cet avatar"  onClick={this._delete}/>
                </div>


                <Modal
                    isOpen={this.state.isCropModalOpened}
                    onRequestClose={() => {}}
                    style={Constants.MODAL_STYLE}
                >
                    <div className="crop-picture-box">
                        <div className="tip">
                            <div className="icon"><i className="fa fa-lightbulb-o fa-2x"></i></div>
                            <div className="text">Faites glisser et redimensionnez le carré central afin de définir votre photo de profil</div>
                        </div>
                        <div style={{height:'300px', width: '300px'}}>
                            <img src={this.state.fileUrl} id="image" alt="profile picture"/>
                        </div>
                        <button className="btn" onClick={this._handleSubmit}>Valider ma photo</button>
                    </div>
                </Modal>

                {
                    this.state.loading ?
                        <div id="general-loading">
                            <AnimatedLoading />
                        </div>
                        : null
                }

            </div>

        );
    }

});

function fireEvent(node, eventName) {
    // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
    var doc;
    if (node.ownerDocument) {
        doc = node.ownerDocument;
    } else if (node.nodeType == 9){
        // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
        doc = node;
    } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
    }

    if (node.dispatchEvent) {
        // Gecko-style approach (now the standard) takes more work
        var eventClass = "";

        // Different events have different event classes.
        // If this switch statement can't map an eventName to an eventClass,
        // the event firing is going to fail.
        switch (eventName) {
            case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
            case "mousedown":
            case "mouseup":
                eventClass = "MouseEvents";
                break;

            case "focus":
            case "change":
            case "blur":
            case "select":
                eventClass = "HTMLEvents";
                break;

            default:
                throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                break;
        }
        var event = doc.createEvent(eventClass);

        var bubbles = eventName == "change" ? false : true;
        event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.

        event.synthetic = true; // allow detection of synthetic events
        // The second parameter says go ahead with the default action
        node.dispatchEvent(event, true);
    } else  if (node.fireEvent) {
        // IE-old school style
        var event = doc.createEventObject();
        event.synthetic = true; // allow detection of synthetic events
        node.fireEvent("on" + eventName, event);
    }
}
