import keyMirror from 'keymirror';

export default {
    // event name triggered from store, listened to by views
    SERVER_BASE_URL: 'http://localhost:3000/api',
    SERVER_IMAGES_URL: 'http://localhost:3000/images',

    // Each time you add an action, add it here... They should be past-tense
    ActionTypes: keyMirror({

        // Auth
        LOGIN: null,
        LOGIN_WITH_FACEBOOK: null,
        SIGNIN: null,
        GET_USER_DATA: null,
        LOGOUT: null,
        FORGET_PASSWORD: null,
        RESET_PASSWORD: null,

        // Settings
        UPDATE_NAME: null,
        UPDATE_PASSWORD: null,
        UPDATE_PICTURE: null,
        DELETE_PICTURE: null,

        // App
        GET_WALLS: null,
        GET_WALL_BY_ID: null,
        UPLOAD_WALL_PICTURE: null,
        ADD_POST: null,
        GET_POSTS_BY_WALL_ID: null,
        HIDE_POST: null,
        DOWNLOAD_POSTS: null,
        GET_POSTS: null,
        DOWNLOAD_ALL_POSTS: null
    }),

    MODAL_STYLE: {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            padding               : '0px',
            borderRadius          : '2px',
            minWidth              : '300px',
            border                : 'none',
            overflow: 'visible',
            width: 'calc(100% - 20px)',
            maxWidth: '350px'
        },
        overlay: {
            backgroundColor   : 'rgba(0, 0, 0, 0.45)'
        }
    }

};
