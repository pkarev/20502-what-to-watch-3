import {reducer} from './reducer.js';
import movies from './mocks/movies';

const initialState = {
  genreFilter: `all`,
  movies,
};

it(`Reducer without params should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});
