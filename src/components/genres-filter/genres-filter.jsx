import React from 'react';
import PropTypes from 'prop-types';
import {ALL_GENRES_FILTER} from '../../reducer.js';

const GenresFilter = ({movies, genreFilter, onGenresFilterClick}) => {
  const genresList = [ALL_GENRES_FILTER];

  movies.map((movie) => {
    if (genresList.includes(movie.genre)) {
      return;
    }

    genresList.push(movie.genre);
  });

  genresList.sort();

  return (
    <ul className="catalog__genres-list">
      {genresList.map((genre) => (
        <li className={`catalog__genres-item${genre === genreFilter ? ` catalog__genres-item--active` : ``}`} key={genre}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => {
            evt.preventDefault();
            onGenresFilterClick(genre);
          }}>{genre}</a>
        </li>
      ))}
    </ul>
  );
};

GenresFilter.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.string.isRequired,
  })),
  genreFilter: PropTypes.string.isRequired,
  onGenresFilterClick: PropTypes.func.isRequired,
};

export default GenresFilter;
