import React from 'react';
import WallStore from '../stores/WallStore';
import WallActionCreator from '../actions/WallActionCreator';
import PostActionCreator from '../actions/PostActionCreator';
import {navigate} from 'react-mini-router';

// Components
import WallsMap from '../components/WallsMap/WallsMap.jsx';
import AddPostModal from '../components/WallsMap/AddPostModal.jsx';
import ChooseActionModal from '../components/WallsMap/ChooseActionModal.jsx';
import Tooltip from '../components/WallsMap/Tooltip.jsx';
import AnimatedLoading from '../components/Loading/AnimatedLoading.jsx';
import EventListener from '../mixins/EventListenerMixin';
import Constants from '../Constants'

module.exports = React.createClass({

    mixins: [WallStore.mixin, EventListener(Constants.ActionTypes.DOWNLOAD_ALL_POSTS)],
    onEvent() {
        this.setState({loading: false});
    },

    getInitialState() {
        return {
            walls: WallStore.getWalls(),
            isChoosingAWall: false,
            selectedWallId: null,
            wallIdToChooseAction: null
        }
    },

    storeDidChange() {
        this.setState({walls: WallStore.getWalls(), loading: false});
    },

    componentDidMount() {
        WallActionCreator.getWalls();
        if (this.state.walls === 0) this.setState({loading: true});
        document.addEventListener('keyup', this._onKeyUp, false);
    },

    componentWillUnmout() {
        document.removeEventListener('keyup', this._onKeyUp, false);
    },

    _onKeyUp(e) {
        if (e.which === 27 && this.state.isChoosingAWall) {
            this.setState({isChoosingAWall: false});
        }
    },

    componentWillReceiveProps(nextProps) {
        if (!nextProps.user.id) {
            this.setState({isChoosingAWall: false});
        }
    },

    _toggleChoosing() {
        this.setState({isChoosingAWall: !this.state.isChoosingAWall});
    },

    _onWallClick(id) {
        if (this.state.isChoosingAWall) this.setState({selectedWallId: id});
        else {
            if (this.props.user && this.props.user.roles && this.props.user.roles.indexOf('admin') >= 0) {
                // show possibilities
                this.setState({wallIdToChooseAction: id});
            } else {
                navigate('/walls/' + id);
            }
        }
    },

    _onAddPostModalRequestClose(isChoosingAWall) {
        this.setState({selectedWallId: null, isChoosingAWall});
    },

    _onChooseActionModalRequestClose() {
        this.setState({wallIdToChooseAction: null});
    },

    _downloadAll() {
        this.setState({loading: true});
        PostActionCreator.downloadAllPosts();
    },

    render() {
        let self = this;
        return (
            <div className={"walls" + (self.state.isChoosingAWall ? " pencil-cursor": "")}>

                <Tooltip />

                <WallsMap
                    walls={self.state.walls}
                    user={self.props.user}
                    isChoosingAWall={self.state.isChoosingAWall}
                    ref="wallsMap"
                    onWallClick={self._onWallClick}/>

                <div id="message-button"
                     className={(
                     self.props.user.id ?
                     (self.props.user.roles.indexOf('user') >= 0 || self.props.user.roles.indexOf('organization') >= 0 ?
                        (self.props.user.lastPost && self.props.user.lastPost.id ? 'disabled' : 'animated tada')
                        : 'not-user')
                     : 'disabled')}
                     onClick={self.props.user.id && (!self.props.user.lastPost || !self.props.user.lastPost.id) ? self._toggleChoosing : () =>{}}>
                    <i className="fa fa-pencil fa-2x"/>
                </div>

                { this.renderTooltip() }

                <div id="download-button"
                     style={{
                        display: self.props.user.id && (self.props.user.roles.indexOf('admin') >= 0 || self.props.user.roles.indexOf('messenger') >= 0) ? 'block' : 'none'}}
                     onClick={self.props.user.id && (self.props.user.roles.indexOf('admin') >= 0 || self.props.user.roles.indexOf('messenger') >= 0) ? self._downloadAll : () =>{} }
                >
                    <i className="fa fa-download fa-2x"/>
                </div>

                <AddPostModal
                    isOpen={self.state.selectedWallId !== null}
                    onRequestClose={self._onAddPostModalRequestClose}
                    wallId={self.state.selectedWallId}
                />

                <ChooseActionModal
                    isOpen={self.state.wallIdToChooseAction !== null}
                    onRequestClose={self._onChooseActionModalRequestClose}
                    wallId={self.state.wallIdToChooseAction}
                />

                { this.renderLoading() }

            </div>

        );
    },

    renderTooltip() {
        if (this.props.user.id) {
            if (this.props.user.id && this.props.user.lastPost && this.props.user.lastPost.id) {
                return (
                    <div id="message-speech-bubble" className="connect">
                        Vous avez déjà posté aujourd'hui !
                    </div>
                );
            } else if (this.state.isChoosingAWall && (this.props.user.roles.indexOf('user') >= 0 || this.props.user.roles.indexOf('organization') >= 0)) {
                return (
                    <div id="message-speech-bubble">
                        Choisissez Votre Mur
                    </div>
                );
            } else if (!this.state.isChoosingAWall && (this.props.user.roles.indexOf('user') >= 0 || this.props.user.roles.indexOf('organization') >= 0)) {
                return (
                    <div id="message-speech-bubble" className="connect">
                        Cliquez ici pour poster un message
                    </div>
                );
            } else if (this.props.user.roles.indexOf('admin') >= 0 || this.props.user.roles.indexOf('messenger') >= 0) {
                return (
                    <div id="message-speech-bubble" className="connect">
                        Télécharger tous les messages à afficher
                    </div>
                );
            }
        } else {
            return (
                <div id="message-speech-bubble" className="connect">
                    Connectez vous pour laisser un message !
                </div>
            );
        }
        return null;
    },

    renderLoading() {
        return this.state.loading ?
            <div id="general-loading">
                <AnimatedLoading />
            </div>
            : null
    }

});
