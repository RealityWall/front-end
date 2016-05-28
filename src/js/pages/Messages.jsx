import React from 'react';
import PostStore from '../stores/PostStore';
import ActionCreator from '../actions/PostActionCreator';

export default React.createClass({

    mixins: [PostStore.mixin],
    storeDidChange() {
        this.setState({posts: PostStore.getAllPosts()});
    },

    getInitialState() {
        return {
            posts: PostStore.getAllPosts()
        };
    },

    componentDidMount() {
        ActionCreator.getAllPosts();
    },

    _loadMore() {
        this.state.posts.length > 0 && ActionCreator.getAllPosts(this.state.posts[this.state.posts.length - 1].id);
    },

    isLast() {
        return this.state.posts.length > 0 && this.state.posts[this.state.posts.length - 1].id === 1;
    },

    render() {
        return (
            <div className="messages">
                <div className="messages-container">
                    {
                        this.state.posts.map((post) => {
                            return (
                                <div className="post-item" key={post.id}>
                                    {post.content}
                                </div>
                            );
                        })
                    }
                </div>
                {
                    this.isLast() ?
                        null :
                        <div>
                            <button className="btn btn-transparent" onClick={this._loadMore}>Load more</button>
                        </div>
                }

            </div>
        );
    }

});
