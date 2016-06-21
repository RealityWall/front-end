import React from "react";
import request from "superagent";
import Constants from "../../Constants";
import {navigate} from "react-mini-router";
import AnimatedLoading from "../Loading/AnimatedLoading.jsx";

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
            .end((err, res) => {
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
            <div style={{position: 'relative'}}>
                {
                    this.state.loading ?
                        <div id="general-loading"><AnimatedLoading /></div>
                        :
                        (
                            <div>
                                {this.state.success ?
                                    <div className="not-found">
                                        <img src="img/verified.png"
                                             style={{width: '100%', display: 'block', maxWidth: '150px', margin: 'auto'}}/>
                                        <div style={{maxWidth: '600px', margin: 'auto', textAlign: 'center'}}>
                                            <div style={{fontSize:'24px'}}>Bravo ! Votre compte est maintenant <span
                                                style={{fontWeight:'bold'}}>validé</span> !
                                            </div>
                                            <div style={{fontSize:'24px'}}>Vous allez être redirigé(e) vers l'accueil
                                            </div>
                                        </div>
                                    </div>
                                    : null}
                                {this.state.error ?
                                    <div className="not-found">
                                        <img src="img/404.png"
                                             style={{width: '100%', display: 'block', maxWidth: '600px', margin: 'auto'}}/>
                                        <div style={{maxWidth: '600px', margin: 'auto', textAlign: 'center'}}>
                                            <div style={{fontSize:'24px'}}><span
                                                style={{fontWeight:'bold'}}>Oops !</span> Il semblerait que le lien sur
                                                lequel vous avez cliqué a expiré !
                                            </div>
                                            <div style={{marginTop: '16px'}}>
                                                <button className="btn" onClick={ () => navigate("/")}>Aller à
                                                    l'accueil
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    : null}
                            </div>
                        )
                }
            </div>
        );
    }

});
