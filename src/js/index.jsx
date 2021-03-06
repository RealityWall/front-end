import React from "react";
import ReactDOM from "react-dom";
import {RouterMixin, navigate} from "react-mini-router";
import UserActionCreator from "./actions/UserActionCreator";
import UserStore from "./stores/UserStore";
import AppContainer from "./components/App/App.jsx";
import Home from "./pages/Home.jsx";
import Walls from "./pages/WallsMap.jsx";
import WallById from "./pages/WallGallery.jsx";
import WallUploadById from "./pages/WallUpload.jsx";
import WallPostsById from "./pages/WallPosts.jsx";
import VerifyUser from "./pages/VerifyUser.jsx";
import Settings from "./pages/Settings.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Posts from "./pages/Posts.jsx";

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
        '/reset-password/:token': 'resetPassword',
        '/posts': 'posts'
    },

    home() {
        return (<Home />);
    },
    walls() {
        return (<Walls user={this.state.user}/>);
    },
    wallById(wallId) {
        let wallIdSplit = wallId.split('&');
        if (wallIdSplit.length === 1) {
            return (<WallById wallId={ wallId }/>);
        } else {
            return (<WallById wallId={ wallIdSplit[0] }/>);
        }

    },
    verifyUser(token) {
        return <VerifyUser token={token}/>
    },

    resetPassword(token) {
        if (this.state.user.id) navigate('/');
        else {
            if (!this.state.isLoggingIn) {
                return (<ResetPassword token={token}/>);
            }
        }
    },
    settings() {
        if (this.state.user.id) return (<Settings user={this.state.user}/>);
        else if (!this.state.isLoggingIn) navigate('/');
    },

    listPostsByWallId(wallId) {
        if (this.state.user.id && this.state.user.roles && (this.state.user.roles.indexOf('admin') >= 0 || this.state.user.roles.indexOf('messenger') >= 0)) return (
            <WallPostsById wallId={wallId}/>);
        else if (!this.state.isLoggingIn) navigate('/');
    },

    uploadImageByWallId(wallId) {
        if (this.state.user.id && this.state.user.roles && (this.state.user.roles.indexOf('admin') >= 0 || this.state.user.roles.indexOf('messenger') >= 0)) return (
            <WallUploadById wallId={wallId}/>);
        else if (!this.state.isLoggingIn) navigate('/');
    },

    posts() {
        return (<Posts />);
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
        return (
            <div className="not-found">
                <img src="img/404.png" style={{width: '100%', display: 'block', maxWidth: '600px', margin: 'auto'}}/>
                <div style={{maxWidth: '600px', margin: 'auto', textAlign: 'center'}}>
                    <div style={{fontSize:'24px'}}><span style={{fontWeight:'bold'}}>Oops !</span> Il semblerait que la page que vous cherchez n'existe pas !</div>
                    <div style={{marginTop: '16px'}}><button className="btn" onClick={ () => navigate("/")}>Aller à l'accueil</button></div>
                </div>
            </div>
        );
    }

});

ReactDOM.render((
    <MainApp />
), document.getElementById('react-root'));
