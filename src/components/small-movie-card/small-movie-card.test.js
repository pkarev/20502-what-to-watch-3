import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card';

const movie = {
  name: `Fantastic Beasts`,
  poster: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`Render SmallMovieCard`, () => {
  const tree = renderer
    .create(<SmallMovieCard movie={movie} handleCaptionHover={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
