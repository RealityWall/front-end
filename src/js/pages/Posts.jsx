import React from 'react';
import PostStore from '../stores/PostStore';
import ActionCreator from '../actions/PostActionCreator';
import PostItem from '../components/Posts/PostItem.jsx';
import UserStore from '../stores/UserStore';
import moment from 'moment';
import TimeAgo from '../components/WallsPost/TimeAgo.jsx';

let interval = null;

export default React.createClass({

    mixins: [PostStore.mixin],
    storeDidChange() {
        this.setState({posts: PostStore.getAllPosts(), lastUpdate: moment()});
    },

    getInitialState() {
        return {
            posts: PostStore.getAllPosts(),
            currentUser: UserStore.getUser(),
            lastUpdate: moment()
        };
    },

    componentDidMount() {
        ActionCreator.getAllPosts();
        interval = setInterval(() => {
            ActionCreator.getAllPosts();
        }, 60000);
        UserStore.addChangeListener(this._onUserStoreChange);
    },

    _onUserStoreChange() {
        this.setState({currentUser: UserStore.getUser()});
    },

    componentWillUnmount() {
        clearInterval(interval);
        UserStore.removeChangeListener(this._onUserStoreChange);
    },

    _loadMore() {
        this.state.posts.length > 0 && ActionCreator.getAllPosts(this.state.posts[this.state.posts.length - 1].id);
    },

    isLast() {
        return this.state.posts.length > 0 && this.state.posts[this.state.posts.length - 1].id === 1;
    },

    _refresh() {
        ActionCreator.getAllPosts();
    },

    render() {
        return (
            <div className="messages">
                <div className="messages-header">
                    <div className="max-width">
                        Messages
                        <span className="indicator">Dernière mise à jour <TimeAgo time={this.state.lastUpdate}/></span>
                        <button className="refresh-button"
                                onClick={this._refresh}>
                            <i className="fa fa-refresh"></i>
                        </button>
                    </div>
                </div>
                <div className="messages-container max-width">
                    {
                        this.state.posts.map((post) => {
                            return (<PostItem post={post} key={post.id} currentUser={this.state.currentUser}/>);
                        })
                    }
                </div>
                {
                    this.isLast() ?
                        null :
                        <div style={{marginBottom: '16px', textAlign: 'center'}}>
                            <button className="btn btn-transparent" onClick={this._loadMore}>
                                Voir plus
                            </button>
                        </div>
                }

            </div>
        );
    }

});
