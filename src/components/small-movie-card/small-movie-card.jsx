import React from 'react';
import PropTypes from 'prop-types';
import withVideo from '../../hocs/with-video/with-video.jsx';

const SmallMovieCard = (props) => {
  const {movie, onCardClick, renderVideo} = props;
  const {name, previewImage: poster, trailer} = movie;

  return (
    <article className="small-movie-card catalog__movies-card" onClick={(evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      onCardClick(movie);
    }}>
      {renderVideo(trailer, poster, `small-movie-card__image`)}
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
    previewImage: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired
  }),
  renderVideo: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default withVideo(React.memo(SmallMovieCard));
