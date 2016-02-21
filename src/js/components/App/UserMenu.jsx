import React from 'react';
import ReactDOM from 'react-dom';
import Constants from '../../Constants';
import ActionCreator from '../../actions/UserActionCreator';

var UserMenu = React.createClass({

    getInitialState() {
        return {
              isMenuOpened: false
        };
    },

    componentDidMount() { document.addEventListener('click', this._onClick, true); },
    componentWillUnmount() { document.removeEventListener('click', this._onClick, true); },

    _onClick(e) {
        var domNode = ReactDOM.findDOMNode(this);
        if ((!domNode || !domNode.contains(e.target))) {
            this.setState({isMenuOpened: false});
        }
    },

    _toggleMenu() {
        this.setState({ isMenuOpened: !this.state.isMenuOpened });
    },

    _disconnect() {
        ActionCreator.logout();
        this._toggleMenu();
    },

    render() {
        let self = this;
        return (
            <div id="user-menu">

                <img
                    src={
                    self.props.user.imagePath
                        ? Constants.SERVER_IMAGES_URL + '/users/' + self.props.user.imagePath
                        : (
                            self.props.user.facebookId
                                ? 'http://graph.facebook.com/' + self.props.user.facebookId + '/picture?type=square'
                                : 'img/no_image_path.png'
                        )
                }
                    alt="user profile image" title={self.props.user.firstname + ' ' + self.props.user.lastname}
                    onClick={self._toggleMenu}
                />

                {
                    self.state.isMenuOpened ?
                        <div className="floating-menu">
                            <div className="menu-item">
                                <a href="/settings" onClick={self._toggleMenu}><i className="fa fa-gear"/> Paramètres</a>
                            </div>
                            <div className="menu-item">
                                <a onClick={self._disconnect}><i className="fa fa-sign-out" /> Déconnexion</a>
                            </div>

                        </div>
                        : null
                }
            </div>
        );
    }

});

export default UserMenu;
