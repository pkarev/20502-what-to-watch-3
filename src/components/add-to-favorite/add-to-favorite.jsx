import React from 'react';
import PropTypes from 'prop-types';

const AddToFavorite = ({isFavorite, onAddToFavoriteClick}) => (
  <button className="btn btn--list movie-card__button" type="button" onClick={(evt) => {
    evt.preventDefault();
    onAddToFavoriteClick();
  }}>
    {isFavorite ?
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg> :
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"></use>
      </svg>
    }
    <span>My list</span>
  </button>
);

AddToFavorite.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onAddToFavoriteClick: PropTypes.func.isRequired,
};

export default AddToFavorite;
