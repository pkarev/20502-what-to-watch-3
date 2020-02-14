import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const movies = [
  {
    name: `One`,
    id: 1
  },
  {
    name: `Two`,
    id: 2
  },
  {
    name: `Three`,
    id: 3
  },
];

const currentMovie = {
  genre: `Awesome genre`,
  releaseDate: 2020
};

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main currentMovie={currentMovie} movies={movies} onMovieCaptionClick={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
