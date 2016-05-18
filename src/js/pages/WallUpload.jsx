import React from 'react';
import DateInput from '../components/WallUpload/DateInput.jsx';
import PicturePicker from '../components/WallUpload/PicturePicker.jsx';
import ActionCreator from '../actions/WallActionCreator';
import EventListener from '../mixins/EventListenerMixin';
import Constants from '../Constants';

module.exports = React.createClass({

    mixins: [EventListener(Constants.ActionTypes.UPLOAD_WALL_PICTURE)],
    onEvent(e) {
        if (e.status == 'success') {
            this.refs.dateInput.reset();
            this.refs.picturePicker.reset();
            this.setState({success: true, error: null, loading: false});
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Image trop volumineuse ou au mauvais format !';
                    break;
                case 500:
                    break;
            }
            this.setState({success: false, error: errorMessage, loading: false});
        }
    },

    getInitialState() {
        return {
            loading: false
        };
    },

    _uploadWallPicture(e) {
        e.preventDefault();
        ActionCreator.uploadWallPicture(this.props.wallId, this.refs.dateInput.getValue(), this.refs.picturePicker.getValue());
        this.setState({loading: true});
    },

    render() {
        return (
            <div className="uploadImagePage">
                <span><i className="fa fa-picture-o"></i> Choisissez l'image à mettre en ligne</span>
                <form onSubmit={this._uploadWallPicture}>
                    <DateInput ref="dateInput"/>
                    <PicturePicker ref="picturePicker"/>

                    {
                        this.state.error ?
                        <div className="error">
                            {this.state.error}
                        </div> : null
                    }

                    {
                        this.state.success ?
                            <div className="success" style={{color: 'green'}}>
                                Photo Uploadé avec succès !
                            </div> : null
                    }


                    <input type="submit"
                           className="btn"
                           disabled={this.state.loading ? true : false}
                           value={this.state.loading ? 'Chargement...' : 'Valider'}/>
                </form>
            </div>
        );
    }

});
