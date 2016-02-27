import Constants from '../Constants';
import Flux from '../Flux';
import request from 'superagent';
import ActionCreator from '../actions/UserActionCreator';
import eventBuilder from './_eventBuilder';

let _user = {};
let _isLoggingIn = false;
let _sessionId = null;

const UserStore = Flux.createStore({

    getUser() {
        return _user;
    },

    isLoggingIn() {
        return _isLoggingIn;
    },

    getSessionId() {
        return _sessionId;
    },

    setSessionId() {
        _sessionId = localStorage.getItem('sessionid');
        if (!_sessionId) return false;
        return true;
    },

    addPostToUser(post) {
        _user.lastPost = post;
        UserStore.emitChange();
    }

}, function (payload) {

    switch (payload.actionType) {
        case Constants.ActionTypes.LOGIN:
            request
                .post(Constants.SERVER_BASE_URL + '/sessions')
                .send({email: payload.email, password: payload.password})
                .set('Accept', 'application/json')
                .end( (err, res) => {
                    if (err || !res.ok) {
                        // treat error
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.LOGIN, {err, res, status: 'error'}));
                        return;
                    }
                    _sessionId = res.body;
                    localStorage.setItem('sessionid', _sessionId);
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.LOGIN, {status: 'success'}));
                    ActionCreator.getUserData();
                });
            break;
        case Constants.ActionTypes.LOGIN_WITH_FACEBOOK:
            request
                .post(Constants.SERVER_BASE_URL + '/users/facebook')
                .send({accessToken: payload.accessToken, facebookId: payload.facebookId})
                .set('Accept', 'application/json')
                .end( (err, res) => {
                    if (err || !res.ok) {
                        // treat error
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.LOGIN_WITH_FACEBOOK, {err, res, status: 'error'}));
                        return;
                    }
                    _sessionId = res.body;
                    localStorage.setItem('sessionid', _sessionId);
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.LOGIN_WITH_FACEBOOK, {status: 'success'}));
                    ActionCreator.getUserData();
                });
            break;
        case Constants.ActionTypes.SIGNIN:
            request
                .post(Constants.SERVER_BASE_URL + '/users')
                .send({
                    email: payload.email,
                    password: payload.password,
                    firstname: payload.firstname,
                    lastname: payload.lastname
                })
                .set('Accept', 'application/json')
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.SIGNIN, {err, res, status: 'error'}));
                        // treat error
                        return;
                    }
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.SIGNIN, {status: 'success'}));
                });
            break;
        case Constants.ActionTypes.GET_USER_DATA:
            if (_sessionId) {
                if (!_user.id) _isLoggingIn = true;
                UserStore.emitChange();
                request
                    .get(Constants.SERVER_BASE_URL + '/users')
                    .set('sessionid', _sessionId)
                    .set('Accept', 'application/json')
                    .end( (err, res) => {
                        _isLoggingIn = false;
                        if (err || !res.ok) {
                            // treat error
                            localStorage.removeItem('sessionid');
                            _sessionId = null;
                            UserStore.emitChange();
                            return;
                        }
                        console.log(res.body);
                        _user = res.body;
                        UserStore.emitChange();
                    });
            }
            break;
        case Constants.ActionTypes.LOGOUT:
            request
                .del(Constants.SERVER_BASE_URL + '/sessions')
                .set('sessionid', _sessionId)
                .end( (err, res) => {
                    if (err || !res.ok) {
                        // treat error
                    }
                    localStorage.removeItem('sessionid');
                    _sessionId = null;
                    _user = {};
                    _isLoggingIn = false;
                    UserStore.emitChange();
                });
            break;
        case Constants.ActionTypes.UPDATE_NAME:
            request
                .put(Constants.SERVER_BASE_URL + '/users')
                .set('sessionid', _sessionId)
                .send({firstname: payload.firstname, lastname: payload.lastname})
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.UPDATE_NAME, {err, res, status: 'error'}));
                        return;
                    }
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.UPDATE_NAME, {status: 'success'}));
                    if (payload.firstname) _user.firstname = payload.firstname;
                    if (_user.lastname) _user.lastname = payload.lastname;
                    UserStore.emitChange();
                });
            break;
        case Constants.ActionTypes.UPDATE_PASSWORD:
            request
                .put(Constants.SERVER_BASE_URL + '/users/password')
                .set('sessionid', _sessionId)
                .send({oldPassword: payload.oldPassword, newPassword: payload.newPassword})
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.UPDATE_PASSWORD, {err, res, status: 'error'}));
                        return;
                    }
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.UPDATE_PASSWORD, {status: 'success'}));
                });
            break;
        case Constants.ActionTypes.UPDATE_PICTURE:
            request
                .post(Constants.SERVER_BASE_URL + '/users/avatar')
                .set('sessionid', _sessionId)
                .attach('avatar', payload.fileUrl)
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.UPDATE_PICTURE, {err, res, status: 'error'}));
                        return;
                    }
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.UPDATE_PICTURE, {status: 'success'}));
                    ActionCreator.getUserData();
                });
            break;
        case Constants.ActionTypes.DELETE_PICTURE:
            request
                .del(Constants.SERVER_BASE_URL + '/users/avatar')
                .set('sessionid', _sessionId)
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.DELETE_PICTURE, {err, res, status: 'error'}));
                        return;
                    }
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.DELETE_PICTURE, {status: 'success'}));
                    _user.imagePath = null;
                    UserStore.emitChange();
                });
            break;
        case Constants.ActionTypes.FORGET_PASSWORD:
            request
                .post(Constants.SERVER_BASE_URL + '/users/forgot-password')
                .send({email: payload.email})
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.FORGET_PASSWORD, {err, res, status: 'error'}));
                        return;
                    }
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.FORGET_PASSWORD, {status: 'success'}));
                });
            break;
        case Constants.ActionTypes.RESET_PASSWORD:
            request
                .post(Constants.SERVER_BASE_URL + '/users/reset-password/' + payload.token)
                .send({password: payload.password})
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.RESET_PASSWORD, {err, res, status: 'error'}));
                        return;
                    }
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.RESET_PASSWORD, {status: 'success'}));
                });
            break;
    }
});

export default UserStore;
