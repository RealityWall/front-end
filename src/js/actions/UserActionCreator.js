import Constants from '../Constants';
import Flux from '../Flux';

export default Flux.createActions({

    login(email, password) {
        return {
            actionType: Constants.ActionTypes.LOGIN,
            email,
            password
        };
    },

    signin(firstname, lastname, email, password) {
        return {
            actionType: Constants.ActionTypes.SIGNIN,
            firstname,
            lastname,
            email,
            password
        };
    },

    getUserData() {
        return {
            actionType: Constants.ActionTypes.GET_USER_DATA
        };
    },

    logout() {
        return {
            actionType: Constants.ActionTypes.LOGOUT
        };
    }

});
