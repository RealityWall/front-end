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
        case Constants.ActionTypes.ADD_POST:
            request
                .post(Constants.SERVER_BASE_URL + '/walls/' + payload.wallId + '/posts')
                .set('Accept', 'application/json')
                .set('sessionid', UserStore.getSessionId())
                .send({content: payload.content})
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.ADD_POST, {err, res, status: 'error'}));
                        return;
                    }
                    console.log(res.body);
                    UserStore.addPostToUser(res.body);
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.ADD_POST, {status: 'success'}));

                });
            break;

        case Constants.ActionTypes.GET_POSTS:
            // date is already formatted
            request
                .get(Constants.SERVER_BASE_URL + '/walls/' + payload.wallId + '/posts')
                .query({date: payload.date.toISOString()})
                .set('Accept', 'application/json')
                .set('sessionid', UserStore.getSessionId())
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.GET_POSTS, {err, res, status: 'error'}));
                        return;
                    }
                    console.log(res.body);
                    addPostsToWall(payload.wallId, payload.date, res.body);
                    PostStore.emitChange();
                });
            break;

        case Constants.ActionTypes.HIDE_POST:
            request
                .put(Constants.SERVER_BASE_URL + '/walls/' + payload.wallId + '/posts/' + payload.postId)
                .set('Accept', 'application/json')
                .set('sessionid', UserStore.getSessionId())
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.HIDE_POST, {err, res, status: 'error'}));
                        return;
                    }
                    removePostFromWall(payload.wallId, payload.postId);
                    PostStore.emitChange();
                });
            break;
    }
});

export default PostStore;
