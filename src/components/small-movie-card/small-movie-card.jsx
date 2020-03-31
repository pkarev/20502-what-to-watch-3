import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import withVideo from '../../hocs/with-video/with-video.jsx';
import {AppDynamicRoute} from '../../routes';

const SmallMovieCard = (props) => {
  const {movie, onCardClick, renderVideo} = props;
  const {name, previewImage: poster, trailer, id} = movie;

  return (
    <article className="small-movie-card catalog__movies-card" onClick={(evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      onCardClick(movie);
    }}>
      {renderVideo(trailer, poster, `small-movie-card__image`)}
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={AppDynamicRoute.film(id)}>
          {name}
        </Link>
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
  onCardClick: PropTypes.func,
};

export default withVideo(React.memo(SmallMovieCard));
