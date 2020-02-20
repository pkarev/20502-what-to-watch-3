import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    posterSmall: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Awesome genre`,
    releaseDate: 2020,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    posterSmall: `/img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    releaseDate: 2020,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    posterSmall: `/img/moonrise-kingdom.jpg`,
    genre: `Some genre`,
    releaseDate: 2020,
  },
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App movies={movies}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
