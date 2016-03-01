import React from 'react';
import ReactDOM from 'react-dom';
import { RouterMixin, navigate } from 'react-mini-router';

// Actions
import UserActionCreator from './actions/UserActionCreator';

// Stores
import UserStore from './stores/UserStore';

// Components
import AppContainer from './components/App/App.jsx';
import Home from './pages/Home.jsx';
import Walls from './pages/WallsMap.jsx';
import WallById from './pages/WallGallery.jsx';
import WallPostsById from './pages/WallPosts.jsx';
import VerifyUser from './pages/VerifyUser.jsx';
import Settings from './pages/Settings.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

var MainApp = React.createClass({

    mixins: [RouterMixin, UserStore.mixin],

    storeDidChange() {
        this.setState({user: UserStore.getUser(), isLoggingIn: UserStore.isLoggingIn()});
    },

    getInitialState() {
        return {
            isLoggingIn: true,
            user: {}
        };
    },

    componentDidMount() {
        // if we have a session, then retrieve user info
        if (UserStore.setSessionId()) UserActionCreator.getUserData();
        else this.setState({isLoggingIn: false});
    },

    routes: {
        '/': 'home',
        '/walls': 'walls',
        '/walls/:wallId': 'wallById',
        '/walls/:wallId/posts': 'listPostsByWallId',
        '/walls/:wallId/upload': 'uploadImageByWallId',
        '/verify/:token': 'verifyUser',
        '/settings': 'settings',
        '/reset-password/:token': 'resetPassword'
    },

    home() { return (<Home />); },
    walls() { return (<Walls user={this.state.user}/>); },
    wallById(wallId) { return (<WallById wallId={ wallId } />); },
    verifyUser(token) {return <VerifyUser token={token}/>},

    resetPassword(token) {
        if (this.state.user.id) navigate('/');
        else {
            if (!this.state.isLoggingIn) {
                return (<ResetPassword token={token}/>);
            }
        }
    },
    settings() {
        // protect with user login
        if (this.state.user.id) return (<Settings user={this.state.user} />);
        else if (!this.state.isLoggingIn) navigate('/');
    },

    listPostsByWallId(wallId) {
        if (this.state.user.id && this.state.user.roles && this.state.user.roles.indexOf('admin') >= 0) return (<WallPostsById wallId={wallId}/>);
        else if (!this.state.isLoggingIn) navigate('/');
    },

    uploadImageByWallId(wallId) {
        if (this.state.user.id && this.state.user.roles && this.state.user.roles.indexOf('admin') >= 0) return (<div>upload image by wall id {wallId}</div>);
        else if (!this.state.isLoggingIn) navigate('/');
    },

    render() {
        let self = this;
        return (
            <AppContainer user={ self.state.user } loading={ self.state.isLoggingIn }>
                { this.renderCurrentRoute() }
            </AppContainer>
        );
    },

    notFound(path) {
        return <div className="not-found">Page Not Found: {path}</div>;
    }

});

ReactDOM.render((
    <MainApp />
), document.getElementById('react-root'));
