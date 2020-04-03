import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import withVideo from '../../hocs/with-video/with-video.jsx';
import {AppDynamicRoute} from '../../routes';

const SmallMovieCard = (props) => {
  const {
    movie,
    onCardClick,
    renderVideo,
    isPlaying,
    onTogglePlay,
    onResetVideo,
  } = props;

  const {name, previewImage: poster, trailer: src, id} = movie;

  const handleCardClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    onCardClick(movie);
  };

  let playerTimeout;

  useEffect(() => {
    if (playerTimeout) {
      clearTimeout(playerTimeout);
    }
  });

  return (
    <article className="small-movie-card catalog__movies-card"
      onClick={handleCardClick}
      onMouseEnter={() => {
        playerTimeout = setTimeout(() => {
          onTogglePlay();
        }, 1000);
      }}
      onMouseLeave={() => {
        clearTimeout(playerTimeout);
        if (isPlaying) {
          onTogglePlay();
          onResetVideo();
        }
      }}
    >
      <div className="small-movie-card__image">
        {renderVideo({
          src,
          poster,
          muted: true,
        })}
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={AppDynamicRoute.film(id)}>
          {name}
        </Link>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired
  }),
  renderVideo: PropTypes.func.isRequired,
  onCardClick: PropTypes.func,
  onResetVideo: PropTypes.func.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
};

export default withVideo(React.memo(SmallMovieCard));
