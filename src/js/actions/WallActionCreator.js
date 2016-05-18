import Constants from '../Constants';
import Flux from '../Flux';

export default Flux.createActions({

    getWalls() {
        return {
            actionType: Constants.ActionTypes.GET_WALLS
        };
    },

    getWallById(wallId) {
        return {
            actionType: Constants.ActionTypes.GET_WALL_BY_ID,
            wallId
        };
    },

    uploadWallPicture(wallId, date, file) {
        return {
            actionType: Constants.ActionTypes.UPLOAD_WALL_PICTURE,
            wallId,
            date,
            file
        };
    }

});
