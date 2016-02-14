import Constants from '../Constants';
import Flux from '../Flux';

// data storage
let _todos = [];
let id = 0;

// Facebook style store creation.
const TodoStore = Flux.createStore({
    getTodos() {
        return _todos;
    }
}, function (payload) {

    switch (payload.actionType) {
        case Constants.ActionTypes.ADD_TODO:
            _todos.push({
                name: payload.name,
                id: id++
            });
            TodoStore.emitChange();
            break;
        case Constants.ActionTypes.DELETE_TODO:
            for (let i in _todos) {
                if (_todos[i].id == payload.id) {
                    _todos.splice(i, 1);
                    break;
                }
            }
            TodoStore.emitChange();
            break;
    }
});

export default TodoStore;
