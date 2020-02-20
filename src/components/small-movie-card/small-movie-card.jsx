import React from 'react';
import PropTypes from 'prop-types';

const SmallMovieCard = (props) => {
  const {movie, onCardClick} = props;
  const {name, posterSmall: poster} = movie;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image" onClick={(evt) => {
        evt.preventDefault();
        onCardClick(movie);
      }}>
        <img src={poster} alt={name} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">
          {name}
        </a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    posterSmall: PropTypes.string,
  }),
  onCardClick: PropTypes.func.isRequired,
};

export default SmallMovieCard;
