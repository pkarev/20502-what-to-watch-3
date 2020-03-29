import {reducer, ALL_GENRES_FILTER, ActionType} from './app-state.js';

const initialState = {
  activeGenreFilter: ALL_GENRES_FILTER,
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
  });
});
