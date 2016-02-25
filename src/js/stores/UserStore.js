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
                        document.dispatchEvent(eventBuilder('Login', {err, res, status: 'error'}));
                        return;
                    }
                    _sessionId = res.body;
                    localStorage.setItem('sessionid', _sessionId);
                    document.dispatchEvent(eventBuilder('Login', {status: 'success'}));
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
                        document.dispatchEvent(eventBuilder('LoginWithFacebook', {err, res, status: 'error'}));
                        return;
                    }
                    _sessionId = res.body;
                    localStorage.setItem('sessionid', _sessionId);
                    document.dispatchEvent(eventBuilder('LoginWithFacebook', {status: 'success'}));
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
                        document.dispatchEvent(eventBuilder('SignIn', {err, res, status: 'error'}));
                        // treat error
                        return;
                    }
                    document.dispatchEvent(eventBuilder('SignIn', {status: 'success'}));
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
                        document.dispatchEvent(eventBuilder('UpdateName', {err, res, status: 'error'}));
                        return;
                    }
                    document.dispatchEvent(eventBuilder('UpdateName', {status: 'success'}));
                    if (payload.firstname) _user.firstname = payload.firstname;
                    if (_user.lastname) _user.lastname = payload.lastname;
                    UserStore.emitChange();
                });
            break;
        case Constants.ActionTypes.UPDATE_PASSWORD:
            console.log(payload);
            request
                .put(Constants.SERVER_BASE_URL + '/users/password')
                .set('sessionid', _sessionId)
                .send({oldPassword: payload.oldPassword, newPassword: payload.newPassword})
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder('UpdatePassword', {err, res, status: 'error'}));
                        return;
                    }
                    document.dispatchEvent(eventBuilder('UpdatePassword', {status: 'success'}));
                });
            break;
        case Constants.ActionTypes.UPDATE_PICTURE:
            request
                .post(Constants.SERVER_BASE_URL + '/users/avatar')
                .set('sessionid', _sessionId)
                .attach('avatar', payload.fileUrl)
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder('UpdatePicture', {err, res, status: 'error'}));
                        return;
                    }
                    document.dispatchEvent(eventBuilder('UpdatePicture', {status: 'success'}));
                    ActionCreator.getUserData();
                });
            break;
        case Constants.ActionTypes.DELETE_PICTURE:
            request
                .del(Constants.SERVER_BASE_URL + '/users/avatar')
                .set('sessionid', _sessionId)
                .end( (err, res) => {
                    if (err || !res.ok) {
                        document.dispatchEvent(eventBuilder('DeletePicture', {err, res, status: 'error'}));
                        return;
                    }
                    document.dispatchEvent(eventBuilder('DeletePicture', {status: 'success'}));
                    ActionCreator.getUserData();
                });
            break;
    }
});

export default UserStore;
