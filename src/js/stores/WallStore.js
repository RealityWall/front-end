import Constants from '../Constants';
import Flux from '../Flux';
import request from 'superagent';

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
    }
});

export default WallStore;
