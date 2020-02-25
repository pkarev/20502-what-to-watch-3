import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card';

const movie = {
  id: 1,
  name: `Fantastic Beasts`,
  posterSmall: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
};

it(`Render SmallMovieCard`, () => {
  const tree = renderer
    .create(<SmallMovieCard movie={movie} onCardClick={() => {}}/>, {
      createNodeMock: () => ({})
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
