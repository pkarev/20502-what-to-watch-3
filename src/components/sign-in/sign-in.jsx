import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import HomeLink from '../home-link/home-link.jsx';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._emailRef = React.createRef();
    this._passwordRef = React.createRef();

    this._handleAuthSubmit = this._handleAuthSubmit.bind(this);
  }

  _handleAuthSubmit(evt) {
    evt.preventDefault();

    const {onSignInSubmit} = this.props;
    const email = this._emailRef.current.value;
    const password = this._passwordRef.current.value;

    onSignInSubmit(email, password);
  }

  render() {
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <HomeLink/>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._handleAuthSubmit}>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this._emailRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={this._passwordRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <HomeLink linkClass="logo__link--light"/>

          <div className="copyright">
            <p>© 2020 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

SignIn.propTypes = {
  onSignInSubmit: PropTypes.func.isRequired,
};

export default SignIn;
