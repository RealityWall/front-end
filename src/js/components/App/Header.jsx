import React from 'react';

// Components
import UserMenu from './UserMenu.jsx';
import AuthModal from '../AuthModal/AuthModal.jsx';

var Header = React.createClass({

    getInitialState() {
        return {
            modalIsOpen: false,
            isMenuOpen: false
        }
    },

    _openModal(index) {
        this.refs.authModal.openModal(index);
    },

    _closeModal() {
        this.refs.authModal.openModal(-1);
    },

    isSelected(href) {
        if (href == '/walls' && location.hash == '#!/walls') return true;
        if (href == '/' && location.hash == '#!/') return true;
        if (href == '/posts' && location.hash == '#!/posts') return true;
        return false;
    },

    render() {
        let self = this;
        return (
            <div id="header">
                <div className={"header-content " + (self.props.user.id ? "logged":"")}>

                    <a className="menu-button" onClick={() => this.setState({isMenuOpen: !this.state.isMenuOpen})}>
                        <i className={"fa " + (this.state.isMenuOpen ? 'fa-close' : 'fa-bars')}></i>
                    </a>

                    <a href="/"><img src="img/full-logo.png" alt="main logo"/></a>
                    <a href="/"><img src="img/logo.png" alt="main logo"/></a>

                    <div className={"menu-wrapper" + (this.state.isMenuOpen ? ' opened' : '')}>
                        <a href="/"
                           onClick={() => this.setState({isMenuOpen: false})}
                           className={"menu-item" + (this.isSelected('/') ? " selected" : "")}>Accueil</a>
                        <a href="/walls"
                           onClick={() => this.setState({isMenuOpen: false})}
                           className={"menu-item" + (this.isSelected('/walls') ? " selected" : "")}>Murs</a>
                        <a href="/posts"
                           onClick={() => this.setState({isMenuOpen: false})}
                           className={"menu-item" + (this.isSelected('/posts') ? " selected" : "")}>Messages</a>
                    </div>

                    { self.props.user.id ? null : <a className="btn" id="sign-in" onClick={ () => self._openModal(1) }>Inscription</a> }
                    { self.props.user.id ? null : <a className="btn transparent" id="login" onClick={ () => self._openModal(0) }>Connexion</a> }
                    { self.props.user.id ? <UserMenu user={ self.props.user }/> : null}
                </div>
                <AuthModal ref="authModal"/>
            </div>
        );
    }

});

export default Header;
