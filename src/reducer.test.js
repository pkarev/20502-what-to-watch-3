import {reducer} from './reducer.js';
import {ALL_GENRES_FILTER} from './reducer.js';
import {ActionType, ActionCreator, Screen} from './reducer.js';

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
  currentMovie: null,
  activeGenreFilter: ALL_GENRES_FILTER,
  genresList: [],
  activeScreen: Screen.MAIN,
};

it(`Reducer without params should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should load movies`, () => {
  expect(reducer(initialState, ActionCreator.loadMovies(movies))).toMatchObject({
    movies,
    currentMovie: movies[0],
    activeGenreFilter: ALL_GENRES_FILTER,
    genresList: [],
    activeScreen: Screen.MAIN,
  });
});

it(`Reducer should set genreFilter with correct value`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_GENRES_FILTER,
    payload: `Drama`
  })).toMatchObject({
    movies: [],
    currentMovie: null,
    activeGenreFilter: `Drama`,
    genresList: [],
    activeScreen: Screen.MAIN,
  });
});

it(`Reducer should set currentMovie with correct value`, () => {
  expect(reducer(initialState, ActionCreator.setCurrentMovie(movies[1]))).toMatchObject({
    movies: [],
    currentMovie: movies[1],
    activeGenreFilter: ALL_GENRES_FILTER,
    genresList: [],
    activeScreen: Screen.MAIN,
  });
});

it(`Reducer should set activeScreen`, () => {
  expect(reducer(initialState, ActionCreator.setActiveScreen(Screen.MOVIE_PAGE))).toMatchObject({
    movies: [],
    currentMovie: null,
    activeGenreFilter: ALL_GENRES_FILTER,
    genresList: [],
    activeScreen: Screen.MOVIE_PAGE,
  });
});
