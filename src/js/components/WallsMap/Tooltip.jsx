import React from 'react';

export default React.createClass({

    getInitialState() {
        return {
            hasAlreadyRead: localStorage.getItem('hasReadTooltip')
        }
    },

    _onClick() {
        localStorage.setItem('hasReadTooltip', true);
        this.setState({hasAlreadyRead: true});
    },

    render() {
        return (
            this.state.hasAlreadyRead ?
                null :
                <div id="tooltip">
                    <div className="icon">
                        <i className="fa fa-lightbulb-o fa-3x"> </i>
                    </div>
                    <div className="text">
                        <span className="saviez-vous">Le saviez vous ? </span>Vous pouvez cliquer sur un marqueur pour
                        &nbsp;afficher la gallerie d'un mur
                    </div>
                    <div className="valid" onClick={this._onClick}>
                        OK
                    </div>
                </div>
        );
    }

});
