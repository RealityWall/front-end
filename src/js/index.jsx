import React from 'react';
import ReactDOM from 'react-dom';
import { RouterMixin } from 'react-mini-router';

// Components
import Home from './components/App/App.jsx';
import About from './components/About/About.jsx';
import Todo from './components/Todo/Todo.jsx';

var MainApp = React.createClass({

    getInitialState() {
        return {
            loading: true
        };
    },

    componentDidMount() {
        setTimeout(() => {
            this.setState({loading: false});
        }, 1000);
    },

    mixins: [RouterMixin],

    routes: {
        '/home/:nested*': 'home',
        '/todo': 'todo',
        '/about': 'about'
    },

    render() {
        return this.state.loading ?
            <div>Loading...</div>
            : this.renderCurrentRoute();
    },

    home() {
        return <Home root={'/home'}/>;
    },

    todo() {
        return <Todo/>;
    },

    about() {
        return <About/>;
    },

    notFound(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }

});

ReactDOM.render((
    <MainApp />
), document.getElementById('react-root'));
