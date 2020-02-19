import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    poster: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    poster: `/img/bohemian-rhapsody.jpg`,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    poster: `/img/moonrise-kingdom.jpg`
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
