import movies from './mocks/movies.js';

const ALL_GENRES_FILTER = `All genres`;

const initialState = {
  activeGenreFilter: ALL_GENRES_FILTER,
  movies,
  genresList: [],
  currentMovie: movies[0],
};

const ActionType = {
  SET_GENRES_FILTER: `SET_GENRES_FILTER`,
  SET_GENRES_LIST: `SET_GENRES_LIST`,
  SET_CURRENT_MOVIE: `SET_CURRENT_MOVIE`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRES_FILTER:
      return (Object.assign({}, state, {
        activeGenreFilter: action.payload,
      }));
    case ActionType.SET_GENRES_LIST:
      return (Object.assign({}, state, {
        genresList: action.payload,
      }));
    case ActionType.SET_CURRENT_MOVIE:
      return (Object.assign({}, state, {
        currentMovie: action.payload,
      }));
  }

  return state;
};

const ActionCreator = {
  setGenresFilter: (genreFilter) => ({
    type: ActionType.SET_GENRES_FILTER,
    payload: genreFilter,
  }),
  setGenresList: (uniqueGenres) => ({
    type: ActionType.SET_GENRES_LIST,
    payload: uniqueGenres,
  }),
  setCurrentMovie: (currentMovie) => ({
    type: ActionType.SET_CURRENT_MOVIE,
    payload: currentMovie,
  })
};

export {reducer, ActionCreator, ActionType, ALL_GENRES_FILTER};
