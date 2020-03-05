import movies from './mocks/movies.js';

const ALL_GENRES_FILTER = `All genres`;

const initialState = {
  activeGenreFilter: ALL_GENRES_FILTER,
  movies,
};

const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE_FILTER:
      return (Object.assign({}, state, {
        activeGenreFilter: action.payload,
      }));
  }

  return state;
};

const ActionCreator = {
  setGenresFilter: (genreFilter) => ({
    type: ActionType.SET_GENRE_FILTER,
    payload: genreFilter,
  }),
};

export {reducer, ActionCreator, ActionType, ALL_GENRES_FILTER};
