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
                _isLoggingIn = true;
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
                            return;
                        }
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
    }
});

export default UserStore;
