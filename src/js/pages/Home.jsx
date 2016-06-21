import React from 'react';
import {navigate} from 'react-mini-router';

module.exports = React.createClass({

    render() {
        return (
            <div className="max-width" style= {{textAlign: 'center'}}>
                <img src="img/beta.png" style={{display: 'block', margin: 'auto', maxWidth: '200px', width: '100%'}}/>
                <div style={{fontSize:'24px'}}>Ce site est actuellement en phase <span style={{fontWeight:'bold'}}>Bêta</span> !</div>
                <div style={{marginTop: '16px'}}><button className="btn" onClick={ () => navigate("/walls")}>Voir les murs</button></div>
            </div>
        );
    }

});
