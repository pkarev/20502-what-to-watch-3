import MockAdapter from 'axios-mock-adapter';
import {reducer, formatMovie, ActionCreator, ActionType, Operation} from './data.js';
import {createAPI} from '../../api.js';

const api = createAPI(() => {});

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    isFavorite: false,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `/img/bohemian-rhapsody.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    isFavorite: false,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    previewImage: `/img/moonrise-kingdom.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    isFavorite: false,
  }
];

const toggledFavoriteMovies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    isFavorite: true,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `/img/bohemian-rhapsody.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    isFavorite: false,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    previewImage: `/img/moonrise-kingdom.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    isFavorite: false,
  }
];

const initialState = {
  movies: [],
  promoMovie: {},
  favoriteMovies: [],
};

const mockState = {
  movies,
  promoMovie: movies[0],
  favoriteMovies: [],
};

it(`Reducer without params should return initial state`, () => {
  expect(reducer(undefined, {})).toMatchObject(initialState);
});

it(`Reducer should set movies`, () => {
  expect(reducer(initialState, ActionCreator.setMovies(movies))).toMatchObject({
    movies,
    promoMovie: {},
    favoriteMovies: [],
  });
});

it(`Reducer should set promo movie`, () => {
  expect(reducer(initialState, ActionCreator.setPromoMovie(movies[0]))).toMatchObject({
    movies: [],
    promoMovie: movies[0],
    favoriteMovies: [],
  });
});

it(`Reducer should toggle favorite status`, () => {
  expect(reducer(mockState, ActionCreator.updateFavoriteStatus(toggledFavoriteMovies[0]))).toMatchObject({
    movies: toggledFavoriteMovies,
    promoMovie: toggledFavoriteMovies[0],
    favoriteMovies: [toggledFavoriteMovies[0]],
  });
});

it(`Reducer should set favorite movies`, () => {
  expect(reducer(initialState, ActionCreator.setFavoriteMovies(movies))).toMatchObject({
    movies: [],
    promoMovie: {},
    favoriteMovies: movies,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /flims`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, []);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: [],
        });
      });
  });

  it(`Should make a correct API call to /flims/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoMovieLoader = Operation.loadPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, {});

    return promoMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: formatMovie({}),
        });
      });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteLoader = Operation.getFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, []);

    return favoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FAVORITE_MOVIES,
          payload: [],
        });
      });
  });
});
