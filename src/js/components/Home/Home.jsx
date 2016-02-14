import React from 'react';
import Link from '../Link.jsx';
import App from '../App/App.jsx';

module.exports = React.createClass({

    render() {
        return (
            <div>
                THIS IS HOME
                <Link ref="link" href="#!/about">Go About</Link>
                <App/>
            </div>
        );
    }

});
