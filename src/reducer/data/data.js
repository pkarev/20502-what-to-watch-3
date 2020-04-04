import {ResponseStatusCode} from '../../api';
import history from '../../history';
import {AppDynamicRoute, AppRoute} from '../../routes';
import {formatDuration, getRatingName} from './data-utils';

const initialState = {
  movies: [],
  promoMovie: {},
  favoriteMovies: [],
};

const ActionType = {
  SET_MOVIES: `SET_MOVIES`,
  SET_PROMO_MOVIE: `SET_PROMO_MOVIE`,
  SET_FAVORITE_MOVIES: `SET_FAVORITE_MOVIES`,
  UPDATE_FAVORITE_STATUS: `UPDATE_FAVORITE_STATUS`,
};

const ActionCreator = {
  setMovies: (movies) => ({
    type: ActionType.SET_MOVIES,
    payload: movies,
  }),
  setPromoMovie: (movie) => ({
    type: ActionType.SET_PROMO_MOVIE,
    payload: movie,
  }),
  setFavoriteMovies: (movies) => ({
    type: ActionType.SET_FAVORITE_MOVIES,
    payload: movies,
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
      .then((response) => {
        if (response.status === ResponseStatusCode.OK) {
          history.push(AppDynamicRoute.film(id));
        }
      });
  },
  getFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.setFavoriteMovies(response.data.map((film) => formatMovie(film))));
      });
  },
  addToFavorites: (id, isFavorite) => (dispatch, getstate, api) => {
    return api.post(`/favorite/${id}/${Number(isFavorite) ? 0 : 1}`)
      .catch((err) => {
        if (err.response.status === ResponseStatusCode.UNAUTHORIZED) {
          history.push(AppRoute.SIGN_IN);

          throw err;
        }

        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_MOVIES:
      return (Object.assign({}, state, {
        movies: action.payload,
      }));
    case ActionType.SET_PROMO_MOVIE:
      return (Object.assign({}, state, {
        promoMovie: action.payload,
      }));
    case ActionType.SET_FAVORITE_MOVIES:
      return (Object.assign({}, state, {
        favoriteMovies: action.payload,
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
  trailer: movie.preview_video_link,
  video: movie.video_link,
  poster: movie.poster_image,
  previewImage: movie.preview_image,
  posterBig: movie.background_image,
  isFavorite: movie.is_favorite,
  duration: formatDuration(movie.run_time),
  rating: {
    number: movie.rating,
    count: movie.scores_count,
    name: getRatingName(movie.rating),
  }
});

export {reducer, ActionCreator, ActionType, Operation, formatMovie};
