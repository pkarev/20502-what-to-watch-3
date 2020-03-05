import React from 'react';
import PropTypes from 'prop-types';

const GenresFilter = ({genresList, activeFilter, onGenresFilterClick}) => {
  return (
    <ul className="catalog__genres-list">
      {genresList.map((genre) => (
        <li className={`catalog__genres-item${genre === activeFilter ? ` catalog__genres-item--active` : ``}`} key={genre}>
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
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired),
  activeFilter: PropTypes.string.isRequired,
  onGenresFilterClick: PropTypes.func.isRequired,
};

export default GenresFilter;
