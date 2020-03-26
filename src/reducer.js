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
        dispatch(ActionCreator.loadMovies(adaptFilmsToApp(response.data)));
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

const adaptFilmsToApp = (films) => {
  return films.map((film) => {
    const {
      id,
      name,
      genre,
      description,
      director,
      starring: stars,
      released: releaseDate,
      video_link: trailer,

      poster_image: poster,
      preview_image: previewImage,
      background_image: posterBig,

      rating: ratingNumber,
      scores_count: ratingCount,
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
      previewImage,
      posterBig,
      trailer,
      rating: {
        number: ratingNumber,
        name: getRatingName(ratingNumber),
        count: ratingCount,
      }
    };
  });
};

const RatingNameUpperBoundary = {
  BAD: 3,
  NORMAL: 5,
  GOOD: 8,
  VERY_GOOD: 10,
};

const RatingName = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`,
};

const getRatingName = (value) => {
  if (value < RatingNameUpperBoundary.BAD) {
    return RatingName.BAD;
  }

  if (value < RatingNameUpperBoundary.NORMAL) {
    return RatingName.NORMAL;
  }

  if (value < RatingNameUpperBoundary.GOOD) {
    return RatingName.GOOD;
  }

  if (value < RatingNameUpperBoundary.VERY_GOOD) {
    return RatingName.VERY_GOOD;
  }

  return RatingName.AWESOME;
};

export {reducer, ActionCreator, ActionType, Screen, ALL_GENRES_FILTER, Operation};
