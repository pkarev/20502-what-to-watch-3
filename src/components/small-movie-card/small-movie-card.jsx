import React from 'react';
import PropTypes from 'prop-types';

const SmallMovieCard = ({movie, onCaptionHover}) => {
  const {name, poster} = movie;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={poster} alt={name} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onMouseEnter={(evt) => {
          evt.preventDefault();
          onCaptionHover(movie);
        }}>
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
    poster: PropTypes.string,
  }),
  onCaptionHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;