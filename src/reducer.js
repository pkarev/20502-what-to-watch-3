import movies from './mocks/movies.js';

const ALL_GENRES_FILTER = `All genres`;

const initialState = {
  activeGenreFilter: ALL_GENRES_FILTER,
  movies,
  filteredMovies: movies,
};

const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
  GET_FILTERED_MOVIES: `GET_FILTERED_MOVIES`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE_FILTER:
      return (Object.assign({}, state, {
        activeGenreFilter: action.payload,
      }));
    case ActionType.GET_FILTERED_MOVIES:
      return (Object.assign({}, state, {
        filteredMovies: action.payload,
      }));
  }

  return state;
};

const ActionCreator = {
  setGenresFilter: (genreFilter) => ({
    type: ActionType.SET_GENRE_FILTER,
    payload: genreFilter,
  }),

  getFilteredMovies: (genreFilter) => {
    const filteredMovies = (genreFilter === ALL_GENRES_FILTER)
      ? movies.slice()
      : movies.slice().filter((movie) => movie.genre === genreFilter);

    return {
      type: ActionType.GET_FILTERED_MOVIES,
      payload: filteredMovies,
    };
  }
};

export {reducer, ActionCreator, ActionType, ALL_GENRES_FILTER};
