import React from 'react';
import {Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Main from './main.jsx';
import {ALL_GENRES_FILTER} from '../../reducer/app-state/app-state.js';
import NameSpace from '../../reducer/name-space';
import history from '../../history.js';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Awesome genre`,
    releaseDate: 2020,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    isFavorite: false,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `/img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    releaseDate: 2020,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    isFavorite: false,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    previewImage: `/img/moonrise-kingdom.jpg`,
    genre: `Some genre`,
    releaseDate: 2020,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    isFavorite: false,
  },
];

const mockStore = configureStore([]);

it(`Render Main`, () => {
  const store = mockStore({
    [NameSpace.APP_STATE]: {
      activeGenreFilter: ALL_GENRES_FILTER,
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
        <Router history={history}>
          <Provider store={store}>
            <Main onCardClick={() => {}} onButtonPlayClick={() => {}} onButtonFavoriteClick={() => {}}/>
          </Provider>
        </Router>,
        {
          createNodeMock: () => ({})
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
