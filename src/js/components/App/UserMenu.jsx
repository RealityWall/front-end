import React from 'react';
import Constants from '../../Constants';

var UserMenu = React.createClass({

    getInitialState() {
        return {
              isMenuOpened: false
        };
    },

    _toggleMenu() {
        this.setState({ isMenuOpened: !this.state.isMenuOpened });
    },

    _disconnect() {
        // TODO : send logout
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
                                <a href="/sign-in" onClick={self._toggleMenu}><i className="fa fa-gear"/> Paramètres</a>
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
