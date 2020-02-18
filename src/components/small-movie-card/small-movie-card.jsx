import React from 'react';
import PropTypes from 'prop-types';

const SmallMovieCard = ({movie: {name, poster}, handleCaptionHover}) => (
  <article className="small-movie-card catalog__movies-card" key={name}>
    <div className="small-movie-card__image">
      <img src={poster} alt={name} width="280" height="175"/>
    </div>
    <h3 className="small-movie-card__title">
      <a className="small-movie-card__link" href="movie-page.html" onMouseEnter={(evt) => {
        evt.preventDefault();
        handleCaptionHover({name, poster});
      }}>
        {name}
      </a>
    </h3>
  </article>
);

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string,
    poster: PropTypes.string,
  }),
  handleCaptionHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
