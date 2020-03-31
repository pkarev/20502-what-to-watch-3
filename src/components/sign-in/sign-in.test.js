import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import SignIn from './sign-in.jsx';
import history from '../../history.js';

it(`Render Component`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <SignIn onSignInSubmit={() => {}}/>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
