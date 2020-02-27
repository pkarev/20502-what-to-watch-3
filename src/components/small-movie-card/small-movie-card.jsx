import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

const SmallMovieCard = (props) => {
  const {movie, onCardClick} = props;
  const {name, posterSmall: poster, trailer} = movie;

  return (
    <article className="small-movie-card catalog__movies-card" onClick={(evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      onCardClick(movie);
    }}>
      <VideoPlayer className="small-movie-card__image" src={`${trailer}`} poster={`${poster}`}/>
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterSmall: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired
  }),
  onCardClick: PropTypes.func.isRequired,
};

export default SmallMovieCard;
