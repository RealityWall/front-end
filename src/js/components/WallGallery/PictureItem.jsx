import React from 'react';
import Constants from '../../Constants';
import moment from 'moment';

export default React.createClass({

    render() {
        return (
            <div className="picture-item"
                 onClick={this.props.onClick || () => {}}
                 style={{background: 'url(' + Constants.SERVER_IMAGES_URL + '/walls/' + this.props.picture.imagePath + ')'}}>
                <div className="date">
                    {moment(this.props.picture.date).format('dddd Do MMMM YYYY')}
                </div>
            </div>
        );
    }

});
