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
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `/img/bohemian-rhapsody.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    previewImage: `/img/moonrise-kingdom.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  }
];

const initialState = {
  movies: [],
  promoMovie: {},
};

const commentPost = {
  rating: 8,
  comment: `Bla bla la`
};

it(`Reducer without params should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should set movies`, () => {
  expect(reducer(initialState, ActionCreator.setMovies(movies))).toMatchObject({
    movies,
    promoMovie: {},
  });
});

it(`Reducer should set promo movie`, () => {
  expect(reducer(initialState, ActionCreator.setPromoMovie(movies[0]))).toMatchObject({
    movies: [],
    promoMovie: movies[0],
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
});
