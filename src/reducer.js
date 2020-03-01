import movies from './mocks/movies.js';

const initialState = {
  genreFilter: `all`,
  movies,
};

const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
  GET_FILTERED_MOVIES: `GET_FILTERED_MOVIES`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE_FILTER:
      return (Object.assign({}, state, {
        genreFilter: action.payload,
      }));
    case ActionType.GET_FILTERED_MOVIES:
      return (Object.assign({}, state, {
        movies: action.payload,
      }));
  }

  return state;
};

export {reducer};
