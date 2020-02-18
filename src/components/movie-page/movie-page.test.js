import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page';

it(`Render MoviePage`, () => {
  const tree = renderer
    .create(<MoviePage/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
