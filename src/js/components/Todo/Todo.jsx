import React from 'react';
import Link from '../Link.jsx';

import TodoStore from '../../stores/TodoStore';
import ActionCreator from '../../actions/CarActionCreator';

module.exports = React.createClass({

  getInitialState() {
    return {
      todos: TodoStore.getTodos()
    }
  },

  componentDidMount() {
    TodoStore.addChangeListener(this._onDataChange);
  },

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onDataChange);
  },

  _onDataChange() {
    this.setState({todos: TodoStore.getTodos()});
  },

  _addTodo(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    if (name) ActionCreator.addTodo(name);
    this.refs.name.value = '';
  },

  _deleteTodo(id) {
    ActionCreator.deleteTodo(id);
  },

  render() {
    let self = this;
    return (
      <div>
        <h1>Todos</h1>
        <form onSubmit={self._addTodo}>
          <input type="text" ref="name"/>
          <input type="submit"/>
        </form>
        <div className="todos-container">
          {
            self.state.todos.map( (todo, index) => {
              return (
                <div key={index}>
                  <button onClick={ () => { self._deleteTodo(todo.id) }}>&times;</button> { todo.name }
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

});
