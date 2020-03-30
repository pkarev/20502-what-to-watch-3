import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AppRoute} from '../../routes';

const PrivateRoute = ({render, path, exact = false, isAuthorized}) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => {
      return (
        (isAuthorized) ? (
          render(props)
        ) : (
          <Redirect to={AppRoute.SIGN_IN}/>
        )
      );
    }}
  />
);

PrivateRoute.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

export default PrivateRoute;
