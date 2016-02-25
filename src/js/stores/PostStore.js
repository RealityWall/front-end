import Constants from '../Constants';
import Flux from '../Flux';
import request from 'superagent';
import eventBuilder from './_eventBuilder';
import UserStore from './UserStore';

const WallStore = Flux.createStore({
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
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.ADD_POST, {status: 'success'}));

                });
            break;
    }
});

export default WallStore;
