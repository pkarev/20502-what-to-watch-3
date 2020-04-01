import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAuthStatus, getUserAvatar} from '../../reducer/user/selectors.js';

const UserBlock = ({isAuthorized, avatar}) => (
  <div className="user-block">
    {
      isAuthorized ?
        <Link to="/mylist">
          <div className="user-block__avatar">
            <img src={avatar} alt="User avatar" width="63" height="63"/>
          </div>
        </Link> :
        <Link to="/login">
          Sign in
        </Link>
    }
  </div>
);

UserBlock.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state),
  avatar: getUserAvatar(state),
});

export default connect(mapStateToProps)(React.memo(UserBlock));
