import React from 'react';
import renderer from 'react-test-renderer';
import UserBlock from './user-block';

describe(`Reder UserBlock`, () => {
  it(`Render sign in link if not authorized`, () => {
    const tree = renderer
      .create(<UserBlock isAuthorized={false} onSignInClick={() => {}}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render user avatar if authorized`, () => {
    const tree = renderer
    .create(<UserBlock isAuthorized={true} onSignInClick={() => {}}/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

