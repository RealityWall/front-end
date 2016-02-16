import React from 'react';

// Components
import Header from './Header.jsx';

var App = React.createClass({

    render() {
        // TODO : loading
        return (
            <div id="app-container">
                <Header user={ this.props.user }/>
                <div id="app-body">
                    { this.props.children }
                </div>
            </div>
        );
    }

});

export default App;
