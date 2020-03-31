import {createSelector} from 'reselect';
import NameSpace from '../name-space';
import {ALL_GENRES_FILTER} from '../app-state/app-state';
import {getActiveGenreFilter} from '../app-state/selectors';

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => state[NAME_SPACE].movies;
export const getPromoMovie = (state) => state[NAME_SPACE].promoMovie;
export const getFavoriteMovies = (state) => state[NAME_SPACE].favoriteMovies;

export const getFilteredMovies = (state) => {
  const movies = getMovies(state);

  return getActiveGenreFilter(state) === ALL_GENRES_FILTER ?
    movies :
    movies.filter((movie) => movie.genre === getActiveGenreFilter(state));
};

export const getGenresList = createSelector(
    getMovies,
    (movies) => {
      let genresList = [];

      movies.map((movie) => {
        genresList.push(movie.genre);
      });

      return [ALL_GENRES_FILTER, ...Array.from(new Set(genresList)).sort()];
    }
);
