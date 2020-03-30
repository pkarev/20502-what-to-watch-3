import React from 'react';
import renderer from 'react-test-renderer';
import ButtonPlay from './button-play.jsx';

it(`Render ButtonPlay`, () => {
  const tree = renderer
    .create(<ButtonPlay onClick={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
