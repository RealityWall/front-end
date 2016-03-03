import React from 'react';
import DateInput from '../components/WallUpload/DateInput.jsx';
import PicturePicker from '../components/WallUpload/PicturePicker.jsx';
import ActionCreator from '../actions/WallActionCreator';

module.exports = React.createClass({

    _uploadWallPicture(e) {
        e.preventDefault();
        //console.log( this.refs.dateInput.getValue())
        ActionCreator.uploadWallPicture(this.props.wallId, this.refs.dateInput.getValue(), this.refs.picturePicker.getValue());
    },

    render() {
        return (
            <div>
                <form onSubmit={this._uploadWallPicture}>
                    <DateInput ref="dateInput"/>
                    <PicturePicker ref="picturePicker"/>
                    <input type="submit" className="btn"/>
                </form>
            </div>
        );
    }

});
