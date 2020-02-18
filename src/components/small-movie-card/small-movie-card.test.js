import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card';

const movie = {
  id: 1,
  name: `Fantastic Beasts`,
  poster: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`Render SmallMovieCard`, () => {
  const tree = renderer
    .create(<SmallMovieCard movie={movie} onCardClick={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
