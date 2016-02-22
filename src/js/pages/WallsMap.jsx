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
        return (
            <div className={"walls" + (this.state.isChoosingAWall ? " pencil-cursor": "")}>
                <WallsMap walls={this.state.walls} user={this.props.user} ref="wallsMap" onWallClick={self._onWallClick}/>

                {
                    this.props.user.id ?
                        <div id="message-button"
                             onClick={self._toggleChoosing}>
                            <i className="fa fa-pencil fa-2x"/>
                        </div>
                        : null
                }
                {
                    this.props.user.id && this.state.isChoosingAWall ?
                        <div id="message-speech-bubble">
                            Choisissez Votre Mur
                        </div>
                        : null
                }

            </div>

        );
    }

});
