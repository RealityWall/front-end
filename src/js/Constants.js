import keyMirror from 'keymirror';

export default {
  // event name triggered from store, listened to by views
  SERVER_BASE_URL: 'http://localhost:3000/api',

  // Each time you add an action, add it here... They should be past-tense
  ActionTypes: keyMirror({
      LOGIN: null,
      SIGNIN: null,
      GET_USER_DATA: null,
      LOGOUT: null
  })

};
