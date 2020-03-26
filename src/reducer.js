const ALL_GENRES_FILTER = `All genres`;

const Screen = {
  MAIN: 1,
  MOVIE_PAGE: 2,
};

const initialState = {
  movies: [],
  currentMovie: null,
  activeGenreFilter: ALL_GENRES_FILTER,
  genresList: [],
  activeScreen: Screen.MAIN,
};

const ActionType = {
  SET_GENRES_FILTER: `SET_GENRES_FILTER`,
  SET_GENRES_LIST: `SET_GENRES_LIST`,
  SET_CURRENT_MOVIE: `SET_CURRENT_MOVIE`,
  SET_ACTIVE_SCREEN: `SET_ACTIVE_SCREEN`,
  LOAD_MOVIES: `LOAD_MOVIES`,
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
  }),
  setActiveScreen: (screen) => ({
    type: ActionType.SET_ACTIVE_SCREEN,
    payload: screen
  }),
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(adaptFilmsToMovies(response.data)));
      });
  }
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
    case ActionType.SET_ACTIVE_SCREEN:
      return (Object.assign({}, state, {
        activeScreen: action.payload,
      }));
    case ActionType.LOAD_MOVIES:
      return (Object.assign({}, state, {
        movies: action.payload,
        currentMovie: action.payload[0],
      }));
  }

  return state;
};

const adaptFilmsToMovies = (films) => {
  return films.map((film) => {
    const {
      id,
      name,
      genre,
      description,
      director,
      starring: stars,
      released: releaseDate,

      poster_image: poster,
      preview_image: posterSmall,
      background_image: posterBig,

      rating: ratingNumber,
      rating: ratingName,
      scores_count: ratingCount,

      video_link: trailer,
    } = film;
    return {
      id,
      name,
      genre,
      description,
      director,
      stars,
      releaseDate,
      poster,
      posterSmall,
      posterBig,
      trailer,
      rating: {
        number: ratingNumber,
        name: ratingName,
        count: ratingCount,
      }
    };
  });
};

export {reducer, ActionCreator, ActionType, Screen, ALL_GENRES_FILTER, Operation};
