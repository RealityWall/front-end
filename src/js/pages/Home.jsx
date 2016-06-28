import React from 'react';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const CountDown = React.createClass({

    interval: null,

    getInitialState() {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    },

    calculate() {
        var now = new Date();
        var endDate = new Date(2016, 6, 14, 0, 0, 0, 0);
        var diff = endDate.getTime() - now.getTime();
        const days = parseInt(diff / DAY);
        diff = diff % DAY;
        const hours = parseInt(diff / HOUR);
        diff = diff % HOUR;
        const minutes = parseInt(diff / MINUTE);
        diff = diff % MINUTE;
        const seconds = parseInt(diff / SECOND);
        this.setState({days, hours, minutes, seconds});
    },

    componentDidMount() {
        this.calculate();
        this.interval = setInterval(this.calculate, 1000);
    },

    componentWillUnmount() {
        clearInterval(this.interval);
    },

    render() {
        return (
            <div className="count-down">
                <div className="count-down-item">
                    <div className="text">Jours</div>
                    <div className="number">{this.state.days}</div>
                </div>
                <div className="count-down-item">
                    <div className="text">Heures</div>
                    <div className="number">{this.state.hours}</div>
                </div>
                <div className="count-down-item">
                    <div className="text">Minutes</div>
                    <div className="number">{this.state.minutes}</div>
                </div>
                <div className="count-down-item">
                    <div className="text">Secondes</div>
                    <div className="number">{this.state.seconds}</div>
                </div>
            </div>
        );
    }
});

module.exports = React.createClass({

    render() {
        return (
            <div className="home">
                <div className="opacity">
                    <div className="something-to-be-centered">
                        <div className="title">Date du prochain affichage</div>
                        <CountDown />
                        <div style={{textAlign: 'center', marginTop: '32px'}}>
                            <a href="/post" className="btn" style={{padding: '16px 32px', fontSize: '18px'}}>
                                <i className="fa fa-pencil"></i> écrire un message
                            </a>
                        </div>
                        <div className="social">
                            <a href="https://www.facebook.com/unmurdanslereel/" target="_blank"><i className="fa fa-facebook-square"></i></a>
                            <a href="https://twitter.com/unmurdanslereel" target="_blank"><i className="fa fa-twitter-square"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});
