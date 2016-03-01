import React from 'react';
import PostStore from '../stores/PostStore';
import ActionCreator from '../actions/PostActionCreator';
import moment from 'moment';
import fr from 'moment/locale/fr';

function _getCurrentDate() {
    let momentDate = moment();
    momentDate.locale('fr');
    momentDate.hour(1);
    momentDate.minute(0);
    momentDate.second(0);
    momentDate.millisecond(0);
    return momentDate;
}

module.exports = React.createClass({

    mixins: [PostStore.mixin],
    storeDidChange() {
        this.setState({posts: PostStore.getPostsByWallIdAndDate(this.props.wallId, _getCurrentDate())})
    },

    getInitialState() {
        let currentDate = _getCurrentDate();
        return {
            currentDate: currentDate,
            posts: PostStore.getPostsByWallIdAndDate(this.props.wallId, currentDate)
        };
    },

    componentDidMount() {
        ActionCreator.getPostsByWallIdAndDate(this.props.wallId, _getCurrentDate());
    },

    render() {
        return (
            <div className="wall-posts">
                <div>
                    <span><i className="fa fa-chevron-left"/></span>
                    <span>{this.state.currentDate.format('dddd D MMMM YYYY')}</span>
                    <span><i className="fa fa-chevron-right"/></span>
                </div>
                <div className="post-list">
                    {
                        this.state.posts.map((post, index) => {
                            console.log(post);
                            return (
                                <div className="post-item" key={index}>
                                    { post.User.firstname }
                                    { post.User.lastname }
                                    { post.content }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

});
