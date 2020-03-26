import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Main from './main.jsx';
import {ALL_GENRES_FILTER, Screen} from '../../reducer/app-state/app-state';
import NameSpace from '../../reducer/name-space';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Awesome genre`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `/img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    previewImage: `/img/moonrise-kingdom.jpg`,
    genre: `Some genre`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
];

const promoMovie = {
  genre: `Awesome genre`,
  releaseDate: 2020
};

const mockStore = configureStore([]);

it(`Render Main`, () => {
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
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main promoMovie={promoMovie} onCardClick={() => {}}/>
        </Provider>, {
          createNodeMock: () => ({})
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
