import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import SmallMovieCard from './small-movie-card.jsx';
import history from '../../history.js';

const movie = {
  id: 1,
  name: `Fantastic Beasts`,
  previewImage: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
};

it(`Render SmallMovieCard`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <SmallMovieCard movie={movie} onCardClick={() => {}}/>
        </Router>, {
          createNodeMock: () => ({})
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
