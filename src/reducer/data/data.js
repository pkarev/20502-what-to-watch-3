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

const formatMovie = (movie) => {
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
  } = movie;
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


export {reducer, ActionCreator, ActionType, Operation};
