import Constants from '../Constants';
import Flux from '../Flux';
import request from 'superagent';
import eventBuilder from './_eventBuilder';
import UserStore from './UserStore';

let walls = [
    /*
     {
     wallId: XXX,
     days: [
     {
     date: XXX,
     posts: [DATA_FROM SERVER]
     }
     ]
     }
     */
];

let posts = [];

function addPostsToWall(wallId, date, posts) {
    let wallFound = false;
    for (let i = 0; i < walls.length; i++) {
        if (walls[i].wallId == wallId) {
            wallFound = true;
            let dateFound = false;
            for (let j = 0; j < walls[i].days.length; j++) {
                if (walls[i].days[j].date == date) {
                    walls[i].days[j].posts = posts;
                    dateFound = true;
                    break;
                }
            }
            if (!dateFound) {
                walls[i].days.push({
                    date,
                    posts
                })
            }
            break;
        }
    }
    if (!wallFound) {
        walls.push({
            wallId,
            days: [{
                date,
                posts
            }]
        })
    }
    console.log(walls);
}

function removePostFromWall(wallId, postId) {
    for (let i = 0; i < walls.length; i++) {
        if (walls[i].wallId == wallId) {
            for (let j = 0; j < walls[i].days.length; j++) {
                for (let k = 0; k < walls[i].days[j].posts.length; k++) {
                    if (walls[i].days[j].posts[k].id == postId) {
                        walls[i].days[j].posts.splice(k, 1);
                        return;
                    }
                }
            }
            break;
        }
    }
}

const PostStore = Flux.createStore({

    getAllPosts() {
        return posts;
    },

    getPostsByWallIdAndDate(wallId, date) {
        for (let i = 0; i < walls.length; i++) {
            if (walls[i].wallId == wallId) {
                for (let j = 0; j < walls[i].days.length; j++) {
                    if (walls[i].days[j].date.isSame(date)) {
                        return walls[i].days[j].posts;
                    }
                }
                break;
            }
        }
        return [];
    }

}, function (payload) {

    switch (payload.actionType) {

        case Constants.ActionTypes.GET_POSTS:
            let _request = request
                .get(Constants.SERVER_BASE_URL + '/posts')
                .set('Accept', 'application/json');
            if (payload.mostRecentPostId) {
                _request = _request.query({mostRecentPostId: payload.mostRecentPostId})
            } else if (payload.oldestPostId) {
                _request = _request.query({oldestPostId: payload.oldestPostId})
            }

            _request
                .end((err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.GET_POSTS, {
                            err,
                            res,
                            status: 'error'
                        }));
                        return;
                    }
                    posts = posts
                        .concat(res.body)
                        .filter((post, index, array) => {
                            return array.findIndex((_post) => {
                                    return post.id === _post.id
                                }) === index;
                        })
                        .sort((a, b) => {
                            return b.id - a.id;
                        });
                    PostStore.emitChange();
                });
            break;

        case Constants.ActionTypes.ADD_POST:
            request
                .post(Constants.SERVER_BASE_URL + '/walls/' + payload.wallId + '/posts')
                .set('Accept', 'application/json')
                .set('sessionid', UserStore.getSessionId())
                .send({content: payload.content})
                .end((err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.ADD_POST, {
                            err,
                            res,
                            status: 'error'
                        }));
                        return;
                    }
                    UserStore.addPostToUser(res.body);
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.ADD_POST, {status: 'success'}));

                });
            break;

        case Constants.ActionTypes.GET_POSTS_BY_WALL_ID:
            // date is already formatted
            request
                .get(Constants.SERVER_BASE_URL + '/walls/' + payload.wallId + '/posts')
                .query({date: payload.date.toISOString()})
                .set('Accept', 'application/json')
                .set('sessionid', UserStore.getSessionId())
                .end((err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.GET_POSTS_BY_WALL_ID, {
                            err,
                            res,
                            status: 'error'
                        }));
                        return;
                    }
                    addPostsToWall(payload.wallId, payload.date, res.body);
                    PostStore.emitChange();
                });
            break;

        case Constants.ActionTypes.HIDE_POST:
            request
                .put(Constants.SERVER_BASE_URL + '/walls/' + payload.wallId + '/posts/' + payload.postId)
                .set('Accept', 'application/json')
                .set('sessionid', UserStore.getSessionId())
                .end((err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.HIDE_POST, {
                            err,
                            res,
                            status: 'error'
                        }));
                        return;
                    }
                    removePostFromWall(payload.wallId, payload.postId);
                    PostStore.emitChange();
                });
            break;

        case Constants.ActionTypes.DOWNLOAD_POSTS:
            request
                .post(Constants.SERVER_BASE_URL + '/walls/' + payload.wallId + '/posts/download')
                .set('Accept', 'application/json')
                .set('sessionid', UserStore.getSessionId())
                .end((err, res) => {
                    if (err || !res.ok) {
                        console.log('error');
                        //document.dispatchEvent(eventBuilder(Constants.ActionTypes.DOWNLOAD_POSTS, {err, res, status: 'error'}));
                        return;
                    }
                    //removePostFromWall(payload.wallId, payload.postId);
                    //PostStore.emitChange();
                    let downloadUrl = Constants.SERVER_BASE_URL + '/walls/' + payload.wallId + '/posts/download/' + res.body;
                    var a = document.createElement("a");
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = downloadUrl;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                });
            break;
    }
});

export default PostStore;
