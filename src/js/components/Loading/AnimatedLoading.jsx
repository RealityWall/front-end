import React from 'react';
import Loading from './Loading.jsx';

export default React.createClass({

    render() {
        return (
            <div className="loading-container">
                <Loading width="200"/>
                <img src="img/logo.png" alt="logo" height="120" className="logo"/>
                <div className="text">Chargement</div>
            </div>
        );
    }

})
