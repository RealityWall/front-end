import React from 'react';
import WallStore from '../stores/WallStore';
import ActionCreator from '../actions/WallActionCreator';
import EventListener from '../mixins/EventListenerMixin';
import Constants from '../Constants';
import PictureItem from '../components/WallGallery/PictureItem.jsx';
import PhotoSwipe from '../components/WallGallery/PhotoSwipe.jsx';
import UserStore from '../stores/UserStore';
import AddPostModal from '../components/WallsMap/AddPostModal.jsx';
import {navigate} from 'react-mini-router';
import AnimatedLoading from '../components/Loading/AnimatedLoading.jsx';

let lastWallId = null;

export default React.createClass({

    mixins: [EventListener(Constants.ActionTypes.GET_WALL_BY_ID), UserStore.mixin],
    onEvent(e) {
        if (e.status == 'success') {
            this.setState({success: true, error: null, wall: WallStore.getWallById(this.props.wallId), loading: false});
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Requête male formée';
                    break;
                case 404:
                    errorMessage = 'Oops ! Il semblerait que cette page n\'existe pas.';
                    break;
                case 500:
                    break;
            }
            this.setState({success: false, error: errorMessage, loading: false});
        }
    },

    storeDidChange() {
        this.setState({user: UserStore.getUser()})
    },

    getInitialState() {
        return {
            wall: WallStore.getWallById(this.props.wallId),
            loading: false,
            user: UserStore.getUser(),
            selectedWallId: null
        };
    },

    componentDidMount() {
        if (lastWallId !== this.props.wallId) {
            this.setState({loading: true});
            lastWallId = this.props.wallId;
            ActionCreator.getWallById(this.props.wallId);
        }
    },

    componentWillReceiveProps(nextProps) {
        if (lastWallId !== nextProps.wallId) {
            this.setState({loading: true});
            lastWallId = nextProps.wallId;
            ActionCreator.getWallById(nextProps.wallId);
        }
    },

    componentWillUnmount() {
        lastWallId = null;
    },

    _openGallery(index) {
        this.refs.photoswipe.open(index);
    },

    render() {
        return (
            <div className="wall-gallery">
                {
                    this.state.loading ?
                        this.renderLoading()
                        : (this.state.success ?
                            this.renderWall()
                            : this.renderError()
                    )
                }
            </div>
        );
    },

    _toggleChoosing() {
        this.setState({selectedWallId: this.props.wallId});
    },

    renderWall() {
        return (
            <div>
                <div className="wall-header">
                    <div className="max-width">
                        {this.state.wall.address}
                    </div>
                </div>
                {/* TODO : Header (Map + Modal ?) */}
                <div className="pictures-container max-width">
                    {
                        this.state.wall.Pictures.map((picture, index) => {
                            return (
                                <PictureItem key={index} picture={picture} onClick={() => this._openGallery(index)}/>
                            )
                        })
                    }
                </div>
                {/* TODO : Display message when 0 Picture */}
                <PhotoSwipe pictures={this.state.wall.Pictures} ref="photoswipe"/>

                <div id="message-button"
                     className={(
                     this.state.user.id ?
                     (this.state.user.roles.indexOf('user') >= 0 || this.state.user.roles.indexOf('organization') >= 0 ?
                        (this.state.user.lastPost && this.state.user.lastPost.id ? 'disabled' : 'animated tada')
                        : 'not-user')
                     : 'disabled')}
                     onClick={this.state.user.id && (!this.state.user.lastPost || !this.state.user.lastPost.id) ? this._toggleChoosing : () =>{}}
                >
                    <i className="fa fa-pencil fa-2x"/>
                </div>

                {
                    this.state.user.id && (this.state.user.roles.indexOf('messenger') >= 0 || this.state.user.roles.indexOf('admin') >= 0) ?
                        <div id="upload-button"
                             onClick={() => {navigate('/walls/' + this.props.wallId + '/upload');}}
                        >
                            <i className="fa fa-camera fa-2x"/>
                        </div>
                        : null
                }


                { this.renderTooltip() }

                <AddPostModal
                    isOpen={this.state.selectedWallId !== null}
                    onRequestClose={() => this.setState({selectedWallId: null})}
                    wallId={this.state.selectedWallId}
                />

            </div>
        );
    },

    renderTooltip() {
        if (this.state.user.id) {
            if (this.state.user.id && this.state.user.lastPost && this.state.user.lastPost.id) {
                return (
                    <div id="message-speech-bubble" className="connect">
                        Vous avez déjà posté aujourd'hui !
                    </div>
                );
            } else if (this.state.user.roles.indexOf('user') >= 0 || this.state.user.roles.indexOf('organization') >= 0) {
                return (
                    <div id="message-speech-bubble" className="connect">
                        Cliquez ici pour poster un message sur ce mur
                    </div>
                );
            } else if (this.state.user.roles.indexOf('admin') >= 0 || this.state.user.roles.indexOf('messenger') >= 0) {
                return (
                    <div id="message-speech-bubble" className="connect">
                        Mettre une photo en ligne
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

    renderError() {
        return (
            <div className="not-found">
                <img src="img/404.png" style={{width: '100%', display: 'block', maxWidth: '600px', margin: 'auto'}}/>
                <div style={{maxWidth: '600px', margin: 'auto', textAlign: 'center'}}>
                    <div style={{fontSize:'24px'}}><span style={{fontWeight:'bold'}}>Oops !</span> Il semblerait que le mur que vous cherchez n'existe pas !</div>
                    <div style={{marginTop: '16px'}}><button className="btn" onClick={ () => navigate("/walls")}>Revenir à la carte</button></div>
                </div>
            </div>
        );
    },

    renderLoading() {
        return (
            <div id="general-loading">
                <AnimatedLoading />
            </div>
        );
    }

});
