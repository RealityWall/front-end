import React from 'react';
import PostStore from '../stores/PostStore';
import ActionCreator from '../actions/PostActionCreator';
import PostItem from '../components/Posts/PostItem.jsx';
import UserStore from '../stores/UserStore';

export default React.createClass({

    mixins: [PostStore.mixin],
    storeDidChange() {
        this.setState({posts: PostStore.getAllPosts()});
    },

    getInitialState() {
        return {
            posts: PostStore.getAllPosts(),
            currentUser: UserStore.getUser()
        };
    },

    componentDidMount() {
        ActionCreator.getAllPosts();
        UserStore.addChangeListener(this._onUserStoreChange);
    },

    _onUserStoreChange() {
        this.setState({currentUser: UserStore.getUser()});
    },

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onUserStoreChange);
    },

    _loadMore() {
        this.state.posts.length > 0 && ActionCreator.getAllPosts(this.state.posts[this.state.posts.length - 1].id);
    },

    isLast() {
        return this.state.posts.length > 0 && this.state.posts[this.state.posts.length - 1].id === 1;
    },

    render() {
        return (
            <div className="messages max-width">
                <div className="messages-container">
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
