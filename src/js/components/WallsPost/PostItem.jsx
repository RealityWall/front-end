import React from 'react';
import TimeAgo from './TimeAgo.jsx';

export default React.createClass({

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
                { this.props.post.User.firstname }
                { this.props.post.User.lastname }
                { this.props.post.content }
                <TimeAgo time={this.props.post.createdAt}/>
            </div>
        );
    }

});
