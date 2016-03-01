import Constants from '../Constants';
import Flux from '../Flux';

export default Flux.createActions({

    addPost(wallId, content) {
        return {
            actionType: Constants.ActionTypes.ADD_POST,
            content,
            wallId
        };
    },

    getPostsByWallIdAndDate(wallId, date) {
        return {
            actionType: Constants.ActionTypes.GET_POSTS,
            date,
            wallId
        };
    }

});
