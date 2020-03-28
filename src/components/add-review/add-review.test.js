import React from 'react';
import renderer from 'react-test-renderer';
import AddReview from './add-review';

it(`Render Component`, () => {
  const tree = renderer
    .create(<AddReview id={1} onAddReview={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
