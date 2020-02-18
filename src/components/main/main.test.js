import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    posterSmall: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Awesome genre`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    posterSmall: `/img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    posterSmall: `/img/moonrise-kingdom.jpg`,
    genre: `Some genre`
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
