import {reducer} from './reducer.js';
import movies from './mocks/movies.js';
import {ALL_GENRES_FILTER} from './reducer.js';
import {ActionType, ActionCreator} from './reducer.js';

const initialState = {
  activeGenreFilter: ALL_GENRES_FILTER,
  movies,
  genresList: [],
  currentMovie: movies[0],
};

it(`Reducer without params should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should set genreFilter with correct value`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_GENRES_FILTER,
    payload: `Drama`
  })).toMatchObject({
    activeGenreFilter: `Drama`,
    movies,
    genresList: [],
    currentMovie: movies[0],
  });
});

it(`Reducer should set currentMovie with correct value`, () => {
  expect(reducer(initialState, ActionCreator.setCurrentMovie(movies[1]))).toMatchObject({
    activeGenreFilter: ALL_GENRES_FILTER,
    movies,
    genresList: [],
    currentMovie: movies[1],
  });
});
