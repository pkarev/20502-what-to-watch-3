import {reducer} from './reducer.js';
import movies from './mocks/movies.js';
import {ALL_GENRES_FILTER} from './reducer.js';
import {ActionType} from './reducer.js';

const initialState = {
  activeGenreFilter: ALL_GENRES_FILTER,
  movies,
  filteredMovies: movies,
};

it(`Reducer without params should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should set genreFilter with correct value`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_GENRE_FILTER,
    payload: `Drama`
  })).toEqual({
    activeGenreFilter: `Drama`,
    movies,
    filteredMovies: movies,
  });
});
