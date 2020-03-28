import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app.jsx';
import {Screen, ALL_GENRES_FILTER} from '../../reducer/app-state/app-state.js';
import NameSpace from '../../reducer/name-space.js';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Awesome genre`,
    releaseDate: 2020,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `/img/bohemian-rhapsody.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Drama`,
    releaseDate: 2020,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    previewImage: `/img/moonrise-kingdom.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Some genre`,
    releaseDate: 2020,
  },
];

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.APP_STATE]: {
      activeGenreFilter: ALL_GENRES_FILTER,
      filteredMovies: movies,
      genresList: [ALL_GENRES_FILTER, `Awesome genre`, `Drama`, `Some genre`],
      activeScreen: Screen.MAIN,
      currentMovie: movies[0],
    },
    [NameSpace.DATA]: {
      movies,
      promoMovie: movies[0],
    },
    [NameSpace.USER]: {
      isAuthorized: true,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App onSignInSubmit={() => {}}/>
        </Provider>, {
          createNodeMock: () => ({})
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
