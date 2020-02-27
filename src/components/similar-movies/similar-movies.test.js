import React from 'react';
import renderer from 'react-test-renderer';
import SimilarMovies from './similar-movies';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    posterSmall: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    posterSmall: `/img/bohemian-rhapsody.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    posterSmall: `/img/moonrise-kingdom.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 4,
    name: `Moonrise kindom`,
    posterSmall: `/img/moonrise-kingdom.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  }
];

it(`Render SimilarMovies`, () => {
  const tree = renderer
    .create(<SimilarMovies movies={movies} onCardClick={() => {}}/>, {
      createNodeMock: () => ({})
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
