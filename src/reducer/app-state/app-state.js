const ALL_GENRES_FILTER = `All genres`;

const Screen = {
  MAIN: 1,
  MOVIE_PAGE: 2,
  ERROR_PAGE: 3,
  SIGN_IN_PAGE: 4,
  ADD_REVIEW_PAGE: 5,
};

const initialState = {
  activeMovie: null,
  activeGenreFilter: ALL_GENRES_FILTER,
  genresList: [],
  activeScreen: Screen.MAIN,
};

const ActionType = {
  SET_GENRES_FILTER: `SET_GENRES_FILTER`,
  SET_GENRES_LIST: `SET_GENRES_LIST`,
  SET_ACTIVE_MOVIE: `SET_ACTIVE_MOVIE`,
  SET_ACTIVE_SCREEN: `SET_ACTIVE_SCREEN`,
};

const ActionCreator = {
  setGenresFilter: (genreFilter) => ({
    type: ActionType.SET_GENRES_FILTER,
    payload: genreFilter,
  }),
  setActiveMovie: (activeMovie) => ({
    type: ActionType.SET_ACTIVE_MOVIE,
    payload: activeMovie,
  }),
  setActiveScreen: (screen) => ({
    type: ActionType.SET_ACTIVE_SCREEN,
    payload: screen
  }),
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
    case ActionType.SET_ACTIVE_MOVIE:
      return (Object.assign({}, state, {
        activeMovie: action.payload,
      }));
    case ActionType.SET_ACTIVE_SCREEN:
      return (Object.assign({}, state, {
        activeScreen: action.payload,
      }));
  }

  return state;
};

export {reducer, ActionCreator, ActionType, Screen, ALL_GENRES_FILTER};
