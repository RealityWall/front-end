import React from 'react';

export default React.createClass({

    timeout: null,

    _calcTimeoutDuration(diff, number) {
        return number * (1 - ( diff/number - parseInt(diff/number)));
    },

    _calcTime(time) {
        let diff = new Date() - new Date(time);
        let display = '1s', timeoutDuration = 0;
        if (diff < 60 * 1000) { // 60 sec
            // on compte en sec
            display = parseInt(diff/1000) + ' seconde(s)';
            timeoutDuration = this._calcTimeoutDuration(diff, 1000);
        } else if (diff < 60 * 60 * 1000) { // 1 hour
            // on compte en minutes
            display = parseInt(diff/(60 * 1000)) + ' minute(s)';
            timeoutDuration = this._calcTimeoutDuration(diff, 60 * 1000);
        } else if (diff < 24 * 60 * 60 * 1000) { // 1 day
            // on compte en heures
            display = parseInt(diff/(60 * 60 * 1000)) + ' heure(s)';
            timeoutDuration = this._calcTimeoutDuration(diff, 60 * 60 * 1000);
        } else if (diff < 30 * 24 * 60 * 60 * 1000) { // 1 week
            // on compte en jours
            display = parseInt(diff/(24 * 60 * 60 * 1000)) + ' jour(s)';
            timeoutDuration = this._calcTimeoutDuration(diff, 24 * 60 * 60 * 1000);
        } else if (diff < 365 * 24 * 60 * 60 * 1000) { // 1 year
            // on compte en mois
            display = parseInt(diff/(30 * 24 * 60 * 60 * 1000)) + ' mois';
            timeoutDuration = this._calcTimeoutDuration(diff, 30 * 24 * 60 * 60 * 1000);
        } else {
            // on compte en année
            display = parseInt(diff/(365 * 24 * 60 * 60 * 1000)) + ' an(s)';
            timeoutDuration = this._calcTimeoutDuration(diff, 365 * 30 * 24 * 60 * 60 * 1000);
        }
        this.setState({display: 'il y a ' + display});
        return timeoutDuration;
    },

    _recurseCalcTime(duration) {
        let self = this;
        clearTimeout(this.timeout);

        this.timeout = setTimeout(function () {
            self._recurseCalcTime(self._calcTime(self.props.time));
        }, duration);
    },

    getInitialState() {
        return {
            display: '...'
        };
    },

    componentDidMount() {
        this._recurseCalcTime(this._calcTime(this.props.time));
    },

    componentWillUnmount() {
        clearTimeout(this.timeout);
        this.timeout = null;
    },

    render() {
        return (
            <span>
                { this.state.display}
            </span>
        );
    }

});
