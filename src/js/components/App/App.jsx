import React from 'react';
import ReactDOM from 'react-dom';
import { RouterMixin } from 'react-mini-router';

var App = React.createClass({

    mixins: [RouterMixin],

    routes: {
        '/': 'nothing',
        '/a': 'a',
        '/b': 'b',
        '/c': 'c'
    },

    render() {
        return this.renderCurrentRoute();
    },

    nothing() {
        return <span>aa</span>;
    },

    a() {
        return <div>1</div>;
    },

    b() {
        return <div>2</div>;
    },

    c() {
        return <div>3</div>;
    },

    notFound(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }

});

export default App;
