import React from 'react';

module.exports = React.createClass({

  render() {
    return (
      <a href={this.props.href}>{this.props.children}</a>
    );
  }

});
