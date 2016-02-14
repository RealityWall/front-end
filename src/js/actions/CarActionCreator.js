import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Flux from '../Flux';

export default Flux.createActions({

    addTodo(name) {
        return {
            actionType: Constants.ActionTypes.ADD_TODO,
            name: name
        };
    },

    deleteTodo(id) {
        return {
            actionType: Constants.ActionTypes.DELETE_TODO,
            id: id
        };
    }

});
