import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './sign-in.jsx';

it(`Render Component`, () => {
  const tree = renderer
    .create(<SignIn onSignInSubmit={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
