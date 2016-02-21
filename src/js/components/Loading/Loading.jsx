import React from 'react';

var Loading = React.createClass({

    render() {
        return (
            <img src="img/loading.png" alt="loading" className="loading-image" width={this.props.width ? this.props.width : 100}/>
        );
    }

});

export default Loading;
