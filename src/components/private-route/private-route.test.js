import React from 'react';
import renderer from 'react-test-renderer';
import PrivateRoute from './private-route';
import history from '../../history';
import {Router} from 'react-router-dom';
import PropTypes from 'prop-types';

const MockComponent = ({children}) => (
  <div>
    {children}
  </div>
);

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

it(`Render PrivateRoute child component if authorized`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <PrivateRoute isAuthorized={true} path="" render={() => (
            <MockComponent>
              <p>test</p>
            </MockComponent>
          )}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
