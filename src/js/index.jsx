import React from 'react';
import ReactDOM from 'react-dom';
import { RouterMixin } from 'react-mini-router';

// Actions
import UserActionCreator from './actions/UserActionCreator';

// Stores
import UserStore from './stores/UserStore';

// Components
import AppContainer from './components/App/App.jsx';
import Home from './pages/Home.jsx';
import Walls from './pages/WallsMap.jsx';
import WallById from './pages/WallGallery.jsx';
import PostOnWall from './pages/AddPost.jsx';
import SignIn from './pages/SignIn.jsx';

var MainApp = React.createClass({

    mixins: [RouterMixin, UserStore.mixin],

    storeDidChange() {
        this.setState({user: UserStore.getUser(), isLoggingIn: UserStore.isLoggingIn()});
    },

    getInitialState() {
        return {
            isLoggingIn: false,
            user: {}
        };
    },

    componentDidMount() {
        // if we have a session, then retrieve user info
        if (UserStore.setSessionId()) UserActionCreator.getUserData();
    },

    routes: {
        '/': 'home',
        '/walls': 'walls',
        '/walls/:wallId': 'wallById',
        '/walls/:wallId/post': 'postOnWallById',
        '/sign-in': 'signIn'
    },

    home() { return (<Home />); },
    walls() { return (<Walls />); },
    signIn() { return (<SignIn />); },
    wallById(wallId) { return (<WallById wallId={ wallId } />); },

    /* TODO : secure with login */
    postOnWallById(wallId) { return (<PostOnWall wallId={ wallId } />); },

    render() {
        let self = this;
        return (
            <AppContainer user={ self.state.user } loading={ self.state.isLoggingIn }>
                { this.renderCurrentRoute() }
            </AppContainer>
        );
    },

    notFound(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }

});

ReactDOM.render((
    <MainApp />
), document.getElementById('react-root'));
