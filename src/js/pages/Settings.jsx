import React from 'react';

import NameSettings from '../components/Settings/NameSettings.jsx';
import PasswordSettings from '../components/Settings/PasswordSettings.jsx';
import PictureSettings from '../components/Settings/PictureSettings.jsx';

module.exports = React.createClass({

    render() {
        return (
            <div id="settings" >
                <div className="settings-header">
                    <div className="max-width">
                        Paramètres
                    </div>
                </div>
                <div className="max-width">
                    <PictureSettings user={this.props.user}/>
                    <NameSettings user={this.props.user}/>
                    { this.props.user.facebookId ? null : <PasswordSettings /> }
                </div>
            </div>
        );
    }

});
