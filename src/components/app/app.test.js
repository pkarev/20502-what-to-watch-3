import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

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

it(`Render App`, () => {
  const tree = renderer
    .create(<App currentMovie={currentMovie} movies={movies}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
