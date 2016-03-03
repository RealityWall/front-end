import React from 'react';
import DateInput from '../components/WallUpload/DateInput.jsx';

module.exports = React.createClass({

    _uploadWallPicture(e) {
        e.preventDefault();
    },

    render() {
        return (
            <div>
                THIS IS Wall UPLOAD <br/>
                <form onSubmit={this._uploadWallPicture}>
                    <DateInput ref="dateInput"/>
                </form>

            </div>
        );
    }

});
