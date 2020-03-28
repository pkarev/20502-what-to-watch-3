import React from 'react';
import PropTypes from 'prop-types';

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

export default UserBlock;
