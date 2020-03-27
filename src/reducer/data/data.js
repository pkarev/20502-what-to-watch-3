const initialState = {
  movies: [],
  promoMovie: null,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
};

const ActionCreator = {
  setMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),
  setPromoMovie: (movie) => (
    {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movie,
    }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.setMovies(response.data.map((film) => {
          return formatMovie(film);
        })));
      });
  },
  loadPromoMovie: () => (dispatch, getStore, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.setPromoMovie(formatMovie(response.data)));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return (Object.assign({}, state, {
        movies: action.payload,
      }));
    case ActionType.LOAD_PROMO_MOVIE:
      return (Object.assign({}, state, {
        promoMovie: action.payload,
      }));
  }

  return state;
};

const formatMovie = (movie) => ({
  id: movie.id,
  name: movie.name,
  genre: movie.genre,
  description: movie.description,
  director: movie.director,
  stars: movie.starring,
  releaseDate: movie.released,
  trailer: movie.video_link,
  poster: movie.poster_image,
  previewImage: movie.preview_image,
  posterBig: movie.background_image,
  rating: {
    number: movie.rating,
    count: movie.scores_count,
    name: getRatingName(movie.rating),
  }
});

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


export {reducer, ActionCreator, ActionType, Operation};
