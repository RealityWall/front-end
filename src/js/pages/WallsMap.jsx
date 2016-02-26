import React from 'react';
import WallStore from '../stores/WallStore';
import WallsMap from '../components/WallsMap/WallsMap.jsx';
import WallActionCreator from '../actions/WallActionCreator';
import { navigate } from 'react-mini-router';

module.exports = React.createClass({

    mixins: [WallStore.mixin],

    getInitialState() {
        return {
            walls: WallStore.getWalls(),
            isChoosingAWall: false
        }
    },

    storeDidChange() {
        this.setState({walls: WallStore.getWalls()});
    },

    componentDidMount() {
        WallActionCreator.getWalls();
    },

    componentWillReceiveProps(nextProps) {
        if (!nextProps.user.id) {
            this.refs.wallsMap.setIcon('normal');
            this.setState({isChoosingAWall: false});
        }
    },

    _toggleChoosing() {
        if (this.state.isChoosingAWall) this.refs.wallsMap.setIcon('normal');
        else this.refs.wallsMap.setIcon('selected');
        this.setState({isChoosingAWall: !this.state.isChoosingAWall});
    },

    _onWallClick(id) {
        if (this.state.isChoosingAWall) navigate('/walls/' + id + '/post');
        else navigate('/walls/' + id);

    },

    render() {
        let self = this;
        console.log();
        return (
            <div className={"walls" + (this.state.isChoosingAWall ? " pencil-cursor": "")}>
                <WallsMap walls={this.state.walls} user={this.props.user} ref="wallsMap"
                          onWallClick={self._onWallClick}/>

                <div id="message-button"
                     className={(
                     this.props.user.id ?
                     (this.props.user.roles.indexOf('user') >= 0 ?
                        (this.props.user.lastPost && this.props.user.lastPost.id ? 'disabled' : 'animated tada')
                        : 'not-user')
                     : 'disabled')}
                     onClick={this.props.user.id && (!this.props.user.lastPost || !this.props.user.lastPost.id) ? self._toggleChoosing : () =>{}}>
                    <i className="fa fa-pencil fa-2x"/>
                </div>
                { this.renderTooltip() }
            </div>

        );
    },

    renderTooltip() {
        if (this.props.user.id) {
            if (this.state.isChoosingAWall && this.props.user.roles.indexOf('user') >= 0) {
                return (
                    <div id="message-speech-bubble">
                        Choisissez Votre Mur
                    </div>
                );
            } else if (!this.state.isChoosingAWall && this.props.user.roles.indexOf('user') >= 0) {
                return (
                    <div id="message-speech-bubble" className="connect">
                        Cliquez ici pour poster un message
                    </div>
                );
            } else if (this.props.user.id && this.props.user.lastPost && this.props.user.lastPost.id) {
                return (
                    <div id="message-speech-bubble" className="connect">
                        Vous avez déjà posté aujourd'hui !
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
    }

});
