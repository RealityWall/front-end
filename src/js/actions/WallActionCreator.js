import Constants from '../Constants';
import Flux from '../Flux';

export default Flux.createActions({

    getWalls() {
        return {
            actionType: Constants.ActionTypes.GET_WALLS
        };
    }

});
