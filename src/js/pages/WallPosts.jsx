import React from 'react';
import PostStore from '../stores/PostStore';
import ActionCreator from '../actions/PostActionCreator';
import moment from 'moment';
import fr from 'moment/locale/fr';
import Constants from '../Constants';

// Components
import PostItem from '../components/WallsPost/PostItem.jsx';

function _getCurrentDate() {
    let momentDate = moment();
    momentDate.locale('fr');
    momentDate.hour(1);
    momentDate.minute(0);
    momentDate.second(0);
    momentDate.millisecond(0);
    return momentDate;
}

module.exports = React.createClass({

    mixins: [PostStore.mixin],
    storeDidChange() {
        this.setState({posts: PostStore.getPostsByWallIdAndDate(this.props.wallId, this.state.currentDate)})
    },

    getInitialState() {
        let currentDate = _getCurrentDate();
        return {
            currentDate: currentDate,
            posts: PostStore.getPostsByWallIdAndDate(this.props.wallId, currentDate)
        };
    },

    componentDidMount() {
        ActionCreator.getPostsByWallIdAndDate(this.props.wallId, _getCurrentDate());
    },

    changeCurrentDate(isPrev) {
        if (isPrev) {
            let nextDate = this.state.currentDate.subtract(1, 'days');
            this.setState({currentDate: nextDate, posts: PostStore.getPostsByWallIdAndDate(this.props.wallId, nextDate)});
            ActionCreator.getPostsByWallIdAndDate(this.props.wallId, nextDate);
        } else {
            let nextDate = this.state.currentDate.add(1, 'days');
            this.setState({currentDate: nextDate, posts: PostStore.getPostsByWallIdAndDate(this.props.wallId, nextDate)});
            ActionCreator.getPostsByWallIdAndDate(this.props.wallId, nextDate);
        }
    },

    disableNext() {
        let currentDate = moment();
        return this.state.currentDate.year() == currentDate.year()
            && this.state.currentDate.month() == currentDate.month()
            && this.state.currentDate.date() == currentDate.date();
    },

    render() {
        let mustDisableNext = this.disableNext();
        return (
            <div className="wall-posts max-width">
                <div className="date-picker">
                    <div className="left-arrow" onClick={ () => this.changeCurrentDate(true) }><i className="fa fa-chevron-left fa-2x"/></div>
                    <div className="date">{this.state.currentDate.format('dddd D MMMM YYYY')}</div>
                    <div
                        className={mustDisableNext ? 'disabled right-arrow' : 'right-arrow'}
                        onClick={ () => { if (!mustDisableNext) this.changeCurrentDate(false)} }>
                        <i className="fa fa-chevron-right fa-2x"/>
                    </div>
                </div>
                <br/>
                <div style={{height: '50px', lineHeight: '50px'}}>
                    <a className="btn transparent" onClick={() => ActionCreator.downloadPosts(this.props.wallId)}><i className="fa fa-upload"/>download</a>
                </div>
                <div className="post-list">
                    {
                        this.state.posts.length == 0 ?
                            <div className="no-post-item">Désolé, aucun message n'a pu être trouvé sur ce mur à la date indiquée !</div>
                            :
                            this.state.posts.map((post, index) => {
                                return (<PostItem post={post} key={index}/>);
                            })
                    }
                </div>
            </div>
        );
    }

});
