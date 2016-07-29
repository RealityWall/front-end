import React from 'react';
import EventListenerMixin from '../mixins/EventListenerMixin';
import Constants from '../Constants';
import UserStore from '../stores/UserStore';
import PostStore from '../stores/PostStore';
import moment from 'moment';
import ActionCreator from '../actions/PostActionCreator';
window.moment = moment;
export default React.createClass({

    mixins: [EventListenerMixin(Constants.ActionTypes.ADD_POST), UserStore.mixin],
    storeDidChange() {
        this.setState({user: UserStore.getUser()});
    },
    onEvent(e) {
        if (e.status == 'success') {
            this.refs.content.value = '';
            this.setState({success: true, error: null, message: ''});
        } else {
            let errorMessage = 'Oops ! Erreur du serveur interne.';
            switch (e.res.status) {
                case 400:
                    errorMessage = 'Oops ! Votre message ne convient pas.';
                    break; // bad email or bad password
                case 409:
                    errorMessage = 'Oops ! vous avez déjà posté aujourd\'hui.';
                    break; // password mismatch or not verified
                case 500:
                    break;
            }
            this.setState({success: false, error: errorMessage});
        }
    },

    getInitialState() {
        return {
            message: '',
            user: UserStore.getUser()
        }
    },

    _addPost(e) {
        e.preventDefault();
        console.log('lol');
        this.refs.content.value && ActionCreator.addPost(this.refs.content.value);
    },

    _messageChange(e) {
        if (this.refs.content.value.length > 280) this.refs.content.value = this.refs.content.value.substr(0, 280);
        this.setState({message: this.refs.content.value});
    },

    _canUserPost() {
        return this.state.user.id && (!this.state.user.lastPost || (this.state.user.lastPost && moment(this.state.user.lastPost.createdAt).date() !== moment().date()));
    },

    render() {
        console.log()
        return (
            <div className="post-page">
                <div className={this.state.user.id ? '' : 'blur'}>
                    <div className="post-header">
                        <div className="max-width">
                            Poster un message
                        </div>
                    </div>
                    <div className="max-width">
                        {
                            this._canUserPost() ?
                                <form onSubmit={ this._addPost } className="post-form">
                            <textarea required
                                      ref="content"
                                      disabled={this.state.user.id && this.state.user.lastPost && !this.state.user.lastPost.hasBeenDisplayed}
                                      placeholder="Ton message"
                                      onChange={this._messageChange}/><br/>
                                    <span
                                        className="success">{this.state.success ? ('Bravo ! Votre message sera affiché lors du prochain affichage !') : null}</span>
                                    <span className="error">{this.state.error}</span>
                                    <div className="bottom-container">
                                        <div className="char-counter">
                                            <span className="info">{this.state.message.length} / 280</span>
                                        </div>
                                        <div>
                                            <input type="submit" value="Envoyer ce message" className="btn"/>
                                        </div>
                                    </div>
                                </form> :
                                <div style={{marginTop: '16px', color: 'green'}}>
                                    <i className="fa fa-check"/> Vous avez déjà posté, merci d'attendre demain pour
                                    poster un message
                                    !
                                </div>

                        }

                    </div>
                </div>

                {
                    this.state.user.id ?
                        null :
                        <div className="overlay">
                            <img src="img/arrow.png" alt=""/>
                            <div className="text">
                                Vous devez d'abord vous connecter !
                            </div>
                        </div>
                }
            </div>
        );
    }

});
