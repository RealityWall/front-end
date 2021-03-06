import React from 'react';
import moment from 'moment';

let regexp = /^(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])\-((19|20)[0-9][0-9])$/;

module.exports = React.createClass({

    getInitialState() {
        return {
            error: null
        };
    },

    _validateInput() {
        let dateInput = this.refs.dateInput.value;
        if (dateInput) {
            if (dateInput.match(regexp)) {
                let realDate = moment(dateInput, 'DD-MM-YYYY');
                if (!realDate.isValid()) {
                    this.setState({error: 'Veuillez entrer une date valide'});
                    return false;
                } else {
                    if (realDate.isAfter(moment())) {
                        this.setState({error: 'Veuillez ne pas entrer une date du futur'});
                        return false;
                    } else {
                        this.setState({error: null});
                        return true;
                    }
                }
            } else {
                this.setState({error: 'Veuillez entrer une date au format jj-mm-aaaa'});
                return false;
            }
        } else {
            this.setState({error: null});
            return false;
        }
    },

    reset() {
        this.refs.dateInput.value = '';
        this.setState({error: null});
    },

    getValue() {
        if (this._validateInput()) return moment(this.refs.dateInput.value, 'DD-MM-YYYY');
        return null;
    },

    _setTodayValue() {
        this.refs.dateInput.value = moment().format('DD-MM-YYYY');
    },

    render() {
        return (
            <div className="date-input">
                <i className="fa fa-calendar"/> date : <input type="text" onChange={this._validateInput} placeholder="jj-mm-aaaa" ref="dateInput" maxLength="10" required/>
                <a className="btn transparent" onClick={this._setTodayValue}>aujourd'hui</a>
                { this.state.error ? <div className="error">{this.state.error}</div> : null }
            </div>
        );
    }

});
