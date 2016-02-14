import Constants from '../Constants';
import Flux from '../Flux';
import request from 'superagent';
import ActionCreator from '../actions/UserActionCreator';

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
                        return;
                    }
                    _sessionId = res.body;
                    ActionCreator.getUserData();
                });
            break;
        case Constants.ActionTypes.SIGNIN:
            UserStore.emitChange();
            break;
        case Constants.ActionTypes.GET_USER_DATA:
            if (_sessionId) {
                _isLoggingIn = true;
                request
                    .get(Constants.SERVER_BASE_URL + '/users')
                    .set('sessionid', _sessionId)
                    .set('Accept', 'application/json')
                    .end( (err, res) => {
                        _isLoggingIn = false;
                        if (err || !res.ok) {
                            // treat error
                            return;
                        }
                        _user = res.body;
                        UserStore.emitChange();
                    });
            }
            break;
        case Constants.ActionTypes.LOGOUT:
            UserStore.emitChange();
            break;
    }
});

export default UserStore;
