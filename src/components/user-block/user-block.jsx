import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAuthStatus} from '../../reducer/user/selectors.js';

const UserBlock = ({isAuthorized}) => (
  <div className="user-block">
    {
      isAuthorized ?
        <Link to="/mylist">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
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
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state),
});

export default connect(mapStateToProps)(React.memo(UserBlock));
