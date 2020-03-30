import React from 'react';
import PropTypes from 'prop-types';

const ButtonFavorite = ({isFavorite, onButtonFavoriteClick}) => (
  <button className="btn btn--list movie-card__button" type="button" onClick={(evt) => {
    evt.preventDefault();
    onButtonFavoriteClick();
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

ButtonFavorite.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onButtonFavoriteClick: PropTypes.func.isRequired,
};

export default ButtonFavorite;
