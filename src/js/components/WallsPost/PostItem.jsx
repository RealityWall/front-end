import React from 'react';
import TimeAgo from './TimeAgo.jsx';
import ActionCreator from '../../actions/PostActionCreator';
import Constants from '../../Constants';

export default React.createClass({

    _hidePost() {
        ActionCreator.hidePost(this.props.post.WallId, this.props.post.id);
    },

    render() {
        return (
            <div className="post-item">
                <img src={
                this.props.post.User.imagePath
                    ? Constants.SERVER_IMAGES_URL + '/users/' + this.props.post.User.imagePath
                    : (
                    this.props.post.User.facebookId
                        ? 'http://graph.facebook.com/' + this.props.post.User.facebookId + '/picture?type=square'
                        : 'img/no_image_path.png'
                )
            } alt={ this.props.post.User.firstname + " " + this.props.post.User.lastname } height="50"/>
                <div className="content">
                    <div>
                        <div className="name">{ this.props.post.User.firstname } { this.props.post.User.lastname }</div>
                        <div className="time"><TimeAgo time={this.props.post.createdAt}/></div>
                        <div className="close"><i className="fa fa-times" onClick={this._hidePost}></i></div>
                    </div>
                    <div className="text">{ this.props.post.content }</div>
                </div>
            </div>
        );
    }

});
