import {ResponseStatusCode} from '../../api';
import history from '../../history';
import {AppRoute} from '../../routes';

const initialState = {
  movies: [],
  promoMovie: {},
  favoriteMovies: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  UPDATE_FAVORITE_STATUS: `UPDATE_FAVORITE_STATUS`,
  SET_FAVORITE_MOVIES: `SET_FAVORITE_MOVIES`,
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
    type: ActionType.UPDATE_FAVORITE_STATUS,
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
          history.push(AppRoute.MOVIE_PAGE);
        }
      });
  },
  addToFavorites: (id, isFavorite) => (dispatch, getstate, api) => {
    return api.post(`/favorite/${id}/${Number(isFavorite) ? 0 : 1}`)
      .then((response) => {
        if (response.status === ResponseStatusCode.OK) {
          dispatch(ActionCreator.updateFavoriteStatus(formatMovie(response.data)));
        }
      })
      .catch((err) => {
        if (err.response.status === ResponseStatusCode.UNAUTHORIZED) {
          history.push(AppRoute.SIGN_IN);
        }
      });
  },
  getFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.setFavoriteMovies(response.data.map((film) => formatMovie(film))));
      });
  },
  getComments: (id) => (dispatch, getstate, api) => {
    return api.get(`/comments/${id}`);
  },
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
    case ActionType.UPDATE_FAVORITE_STATUS:
      const movies = updateMoviesFavoriteStatus(state.movies, action.payload);
      const favoriteMovies = updateFavoriteMovies(state.favoriteMovies, action.payload);
      const promoMovie = updatePromoMovie(state.promoMovie, action.payload);

      return (Object.assign({}, state, {
        movies,
        promoMovie,
        favoriteMovies,
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

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
};

const updateFavoriteMovies = (movies, candidate) => {
  let updatedMovies = movies;
  const indexOfCandidate = movies.indexOf(updatedMovies.find((movie) => movie.id === candidate.id));

  if (indexOfCandidate > -1) {
    updatedMovies = [...movies.slice(0, indexOfCandidate), ...movies.slice(indexOfCandidate + 1)];
  } else {
    updatedMovies.push(candidate);
  }

  return updatedMovies;
};

const updateMoviesFavoriteStatus = (movies, updatedMovie) => {
  let updatedMovies = movies;
  const indexOfCandidate = movies.indexOf(movies.find((movie) => movie.id === updatedMovie.id));

  if (indexOfCandidate > -1) {
    updatedMovies = updatedMovies = [...movies.slice(0, indexOfCandidate), updatedMovie, ...movies.slice(indexOfCandidate + 1)];
  }

  return updatedMovies;
};

const updatePromoMovie = (movie, updatedMovie) => {
  if (movie.id === updatedMovie.id) {
    return updatedMovie;
  }

  return movie;
};


export {reducer, ActionCreator, ActionType, Operation, formatMovie};
