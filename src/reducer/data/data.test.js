import {reducer, ActionCreator} from './data.js';

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

