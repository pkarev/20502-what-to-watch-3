import React from 'react';
import renderer from 'react-test-renderer';
import MoviesList from './movies-list';

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
  }
];

it(`Render MoviesList`, () => {
  const tree = renderer
    .create(<MoviesList movies={movies}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
