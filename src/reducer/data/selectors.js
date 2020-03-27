import {createSelector} from 'reselect';
import NameSpace from '../name-space';
import {ALL_GENRES_FILTER} from '../app-state/app-state';

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => state[NAME_SPACE].movies;
export const getPromoMovie = (state) => state[NAME_SPACE].promoMovie;

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
