import Constants from '../Constants';
import Flux from '../Flux';
import request from 'superagent';
import UserStore from './UserStore';
import eventBuilder from './_eventBuilder';

let _walls = [];

const WallStore = Flux.createStore({

    getWalls() {
        return _walls;
    }

}, function (payload) {

    switch (payload.actionType) {
        case Constants.ActionTypes.GET_WALLS:
            request
                .get(Constants.SERVER_BASE_URL + '/walls')
                .set('Accept', 'application/json')
                .end( (err, res) => {
                    if (err || !res.ok) _walls = [];
                    else _walls = res.body;
                    WallStore.emitChange();
                });
            break;

        case Constants.ActionTypes.UPLOAD_WALL_PICTURE:
            request
                .post(Constants.SERVER_BASE_URL + '/walls/' + payload.wallId + '/pictures')
                .set('sessionid', UserStore.getSessionId())
                .field('date', payload.date.toISOString())
                .attach('picture', payload.file)
                .end( (err, res) => {
                    if (err || !res.ok) {
                        console.log('error');
                        document.dispatchEvent(eventBuilder(Constants.ActionTypes.UPLOAD_WALL_PICTURE, {err, res, status: 'error'}));
                        return;
                    }
                    console.log('success');
                    document.dispatchEvent(eventBuilder(Constants.ActionTypes.UPLOAD_WALL_PICTURE, {status: 'success'}));
                });
            break;
    }
});

export default WallStore;
