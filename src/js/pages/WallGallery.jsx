import React from 'react';
import WallStore from '../stores/WallStore';
import ActionCreator from '../actions/WallActionCreator';
import EventListener from '../mixins/EventListenerMixin';
import Constants from '../Constants';
import PictureItem from '../components/WallGallery/PictureItem.jsx';

let lastWallId = null;

export default React.createClass({

    mixins: [EventListener(Constants.ActionTypes.GET_WALL_BY_ID)],
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

    getInitialState() {
        return {
            wall: WallStore.getWallById(this.props.wallId),
            loading: false
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

    renderWall() {
        return (
            <div>
                {/* TODO : Header (Map + Modal ?) */}
                <div className="pictures-container">
                    {
                        this.state.wall.Pictures.map((picture, index) => {
                            return (
                                <PictureItem key={index} picture={picture}/>
                            )
                        })
                    }
                </div>
                {/* TODO : Display message when 0 Picture */}
                {/* TODO : Gallery on Click */}
            </div>
        );
    },

    renderError() {
        return (<div style={{color: 'red'}}> ERROR </div>);
    },

    renderLoading() {
        return (<div>Loading...</div>);
    }

});
