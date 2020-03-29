import {ResponseStatusCode} from '../../api';
import history from '../../history';
import {AppRoute} from '../../routes';

const initialState = {
  movies: [],
  promoMovie: {},
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  TOGGLE_FAVORITE_STATUS: `TOGGLE_FAVORITE_STATUS`,
};

const ActionCreator = {
  setMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),
  setPromoMovie: (movie) => ({
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: movie,
  }),
  updateFavoriteStatus: (movie) => ({
    type: ActionType.TOGGLE_FAVORITE_STATUS,
    payload: movie,
  }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.setMovies(response.data.map((film) => formatMovie(film))));
      });
  },
  loadPromoMovie: () => (dispatch, getStore, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.setPromoMovie(formatMovie(response.data)));
      });
  },
  postComment: (id, commentPost) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, commentPost)
      .catch((err) => {
        throw err;
      });
  },
  addToFavorites: (id, isFavorite) => (dispatch, getstate, api) => {
    return api.post(`/favorite/${id}/${Number(isFavorite) ? 0 : 1}`)
      .then((response) => {
        dispatch(ActionCreator.updateFavoriteStatus(formatMovie(response.data)));
      })
      .catch((err) => {
        if (err.response.status === ResponseStatusCode.UNAUTHORIZED) {
          history.push(AppRoute.SIGN_IN);
        }

        throw err;
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
    case ActionType.TOGGLE_FAVORITE_STATUS:
      return (Object.assign({}, state, {
        movies: state.movies.map((movie) => {
          if (movie.id === action.payload.id) {
            return Object.assign({}, movie, {
              isFavorite: !movie.isFavorite,
            });
          }

          return movie;
        }),
        promoMovie: Object.assign({}, state.promoMovie, {
          isFavorite: !state.promoMovie.isFavorite
        }),
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
  isFavorite: movie.is_favorite,
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


export {reducer, ActionCreator, ActionType, Operation, formatMovie};
