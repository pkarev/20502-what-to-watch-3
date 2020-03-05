import movies from './mocks/movies.js';

const ALL_GENRES_FILTER = `All genres`;

const initialState = {
  activeGenreFilter: ALL_GENRES_FILTER,
  movies,
  genresList: [],
};

const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
  SET_GENRES_LIST: `SET_GENRES_LIST`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE_FILTER:
      return (Object.assign({}, state, {
        activeGenreFilter: action.payload,
      }));
    case ActionType.SET_GENRES_LIST:
      return (Object.assign({}, state, {
        genresList: action.payload,
      }));
  }

  return state;
};

const ActionCreator = {
  setGenresFilter: (genreFilter) => ({
    type: ActionType.SET_GENRE_FILTER,
    payload: genreFilter,
  }),
  setGenresList: () => {
    let genresList = [ALL_GENRES_FILTER];
    movies.map((movie) => {
      genresList.push(movie.genre);
    });
    genresList = Array.from(new Set(genresList)).sort();

    return {
      type: ActionType.SET_GENRES_LIST,
      payload: genresList,
    };
  },
};

export {reducer, ActionCreator, ActionType, ALL_GENRES_FILTER};
