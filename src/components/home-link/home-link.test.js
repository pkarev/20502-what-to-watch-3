import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import HomeLink from './home-link.jsx';
import history from '../../history.js';

it(`Render HomeLink`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <HomeLink/>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
