import React from 'react';
import renderer from 'react-test-renderer';
import ErrorPage from './error-page.jsx';

it(`Render ErrorScreen`, () => {
  const tree = renderer
  .create(<ErrorPage/>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
