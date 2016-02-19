import React from 'react';

// Components
import VerifyUserComponent from '../components/VerifyUser/VerifyUserForm.jsx';

module.exports = React.createClass({

    render() {
        return (
            <VerifyUserComponent token={this.props.token}/>
        );
    }

});
