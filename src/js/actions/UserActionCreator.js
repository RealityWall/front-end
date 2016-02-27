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

    loginWithFacebook(accessToken, facebookId) {
        return {
            actionType: Constants.ActionTypes.LOGIN_WITH_FACEBOOK,
            accessToken,
            facebookId
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
    },

    updateName(firstname, lastname) {
        return {
            actionType: Constants.ActionTypes.UPDATE_NAME,
            firstname,
            lastname
        };
    },

    updatePassword(oldPassword, newPassword) {
        return {
            actionType: Constants.ActionTypes.UPDATE_PASSWORD,
            oldPassword,
            newPassword
        };
    },

    updatePicture(fileUrl) {
        return {
            actionType: Constants.ActionTypes.UPDATE_PICTURE,
            fileUrl
        };
    },

    deletePicture() {
        return {
            actionType: Constants.ActionTypes.DELETE_PICTURE
        };
    },

    forgetPassword(email) {
        return {
            actionType: Constants.ActionTypes.FORGET_PASSWORD,
            email
        };
    },

    resetPassword(token, password) {
        return {
            actionType: Constants.ActionTypes.RESET_PASSWORD,
            token,
            password
        };
    }

});
