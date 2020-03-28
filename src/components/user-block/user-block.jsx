import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAuthStatus} from '../../reducer/user/selectors.js';
import {ActionCreator, Screen} from '../../reducer/app-state/app-state.js';

const UserBlock = ({isAuthorized, onSignInClick}) => (
  <div className="user-block">
    {
      isAuthorized ?
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
        </div> :
        <a href="#" onClick={(evt) => {
          evt.preventDefault();
          onSignInClick();
        }}>Sign in</a>
    }
  </div>
);

UserBlock.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSignInClick() {
    dispatch(ActionCreator.setActiveScreen(Screen.SIGN_IN_PAGE));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(UserBlock));
