import keyMirror from 'keymirror';

export default {
    // event name triggered from store, listened to by views
    SERVER_BASE_URL: 'http://localhost:3000/api',
    SERVER_IMAGES_URL: 'http://localhost:3000/images',

    // Each time you add an action, add it here... They should be past-tense
    ActionTypes: keyMirror({
        LOGIN: null,
        LOGIN_WITH_FACEBOOK: null,
        SIGNIN: null,
        GET_USER_DATA: null,
        LOGOUT: null,
        GET_WALLS: null,
        UPDATE_NAME: null,
        UPDATE_PASSWORD: null,
        UPDATE_PICTURE: null,
        DELETE_PICTURE: null,
        ADD_POST: null
    }),

    MODAL_STYLE: {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        },
        overlay: {
            backgroundColor   : 'rgba(0, 0, 0, 0.45)'
        }
    }

};
