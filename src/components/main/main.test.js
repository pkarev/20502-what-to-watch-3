import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Main from './main.jsx';
import {Provider} from 'react-redux';
import {ALL_GENRES_FILTER} from '../../reducer.js';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    posterSmall: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Awesome genre`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    posterSmall: `/img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    posterSmall: `/img/moonrise-kingdom.jpg`,
    genre: `Some genre`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
];

const currentMovie = {
  genre: `Awesome genre`,
  releaseDate: 2020
};

const mockStore = configureStore([]);

it(`Render Main`, () => {
  const store = mockStore({
    genreFilter: ALL_GENRES_FILTER,
    movies,
    filteredMovies: movies,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main currentMovie={currentMovie} onCardClick={() => {}}/>
        </Provider>, {
          createNodeMock: () => ({})
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
