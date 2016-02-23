import React from 'react';
import UserActionCreator from '../../actions/UserActionCreator';

let cropper = null;

module.exports = React.createClass({

    getInitialState() {
        return {
            error: null,
            success: false,
            file: null,
            fileUrl: null
        };
    },

    componentDidMount() { document.addEventListener('UpdatePicture', this._onUpdatePicture); },
    componentWillUnmount() { document.removeEventListener('UpdatePicture', this._onUpdatePicture); },
    _onUpdatePicture(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null});
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Requête male formée';
                    break; // bad email or bad password
                case 409:
                    errorMessage = 'Oops ! Cette addresse mail est déjà utilisé.';
                    break; // bad email or bad password
                case 500: break; // problem
            }
            this.setState({success: false, error: errorMessage});
        }
    },

    _handleSubmit: function(e) {
        e.preventDefault();
        let dataURL = cropper.getCroppedCanvas().toDataURL();
        let blobBin = atob(dataURL.split(',')[1]);
        let array = [];
        for(let i = 0; i < blobBin.length; i++) array.push(blobBin.charCodeAt(i));
        let file= new Blob([new Uint8Array(array)], {type: 'image/png'});
        UserActionCreator.updatePicture(file);
    },

    _handleFile(e) {
        let self = this;
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onload = function(upload) {
            self.setState({
                file: file,
                fileUrl: upload.target.result
            });
            self._mountImage();
        };
        reader.readAsDataURL(file);
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
                <form onSubmit={this._handleSubmit} encType="multipart/form-data">
                    <input type="file" ref="picture" placeholder="Votre photo de profil" required onChange={this._handleFile}/>
                    <input type="submit" className="btn" value="Mettre à jour"/>
                </form>
                {
                    this.state.file ?
                        <div style={{height:'300px', width: '300px'}}>
                            <img src={this.state.fileUrl} id="image" alt="profile picture"/>
                        </div>:
                        null
                }
                <button onClick={this._delete}>delete</button>
            </div>

        );
    }

});
