import React from 'react';

// Components
import Header from './Header.jsx';

var App = React.createClass({

    _doIHaveToOpenModal() {
        let hrefSplit = location.href.split('?');
        if (hrefSplit.length === 2) {
            let keyValue = hrefSplit[1].split('=');
            if (
                keyValue.length === 2
                && keyValue[0] == 'loginModalOpened'
                && keyValue[1] == 'true'
                && !this.props.user.id
                && !this.props.loading
            ) {
                return true;
            }
        }
        return false;
    },

    componentDidMount() {
        if (this._doIHaveToOpenModal()) { this.refs.header._openModal(); }
        else { this.refs.header._closeModal(); }
    },

    componentDidUpdate() {
        if (this._doIHaveToOpenModal()) { this.refs.header._openModal(); }
        else { this.refs.header._closeModal(); }
    },

    render() {
        // TODO : loading this.props.loading
        return (
            <div id="app-container">
                <Header user={ this.props.user } ref="header"/>
                <div id="app-body">
                    { this.props.children }
                </div>
            </div>
        );
    }

});

export default App;
