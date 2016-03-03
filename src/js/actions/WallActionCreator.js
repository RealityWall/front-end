import Constants from '../Constants';
import Flux from '../Flux';

export default Flux.createActions({

    getWalls() {
        return {
            actionType: Constants.ActionTypes.GET_WALLS
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
