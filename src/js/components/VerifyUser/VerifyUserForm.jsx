import React from 'react';
import request from 'superagent';
import Constants from '../../Constants';
import { navigate } from 'react-mini-router';

module.exports = React.createClass({

    getInitialState() {
        return {
            loading: true,
            success: false,
            error: false
        };
    },

    _verify() {
        let self = this;
        request
            .post(Constants.SERVER_BASE_URL + '/users/verify/' + self.props.token)
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err || !res.ok) {
                    // treat error
                    self.setState({error: true, success: false, loading: false});
                    return;
                }
                setTimeout(() => navigate('/?loginModalOpened=true'), 2000);
                self.setState({success: true, error: false, loading: false})
            });
    },

    componentDidMount() {
        this._verify();
    },

    render() {
        return (
            <div>
                {
                    this.state.loading ? 'Loading' :
                        (
                            <div>
                                {this.state.success ? 'user verified' : null}
                                {this.state.error ? 'token not valid' : null}
                            </div>
                        )
                }
            </div>
        );
    }

});
