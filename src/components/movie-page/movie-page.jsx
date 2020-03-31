import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Tabs from '../tabs/tabs.jsx';
import MovieReviews from '../movie-reviews/movie-reviews.jsx';
import SimilarMovies from '../similar-movies/similar-movies.jsx';
import UserBlock from '../user-block/user-block.jsx';
import ButtonPlay from '../button-play/button-play.jsx';
import ButtonFavorite from '../button-favorite/button-favorite.jsx';
import HomeLink from '../home-link/home-link.jsx';
import {getAuthStatus} from '../../reducer/user/selectors.js';
import {AppDynamicRoute} from '../../routes.js';
import {createAPI} from '../../api.js';

const api = createAPI(() => {});

const MoviePage = (
    {
      isAuthorized,
      movie: {
        id,
        name,
        genre,
        releaseDate,
        rating: {number: ratingNumber, name: ratingName, count: ratingCount},
        description,
        director,
        stars,
        posterBig,
        poster,
        isFavorite,
        duration,
      },
      similarMovies,
      onCardClick,
      onButtonPlayClick,
      onButtonFavoriteClick,
    }) => {

  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    api.get(`/comments/${id}`)
      .then((response) => setReviews(response.data));
  }, []);

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={posterBig} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <HomeLink/>

            <UserBlock/>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <ButtonPlay onClick={onButtonPlayClick}/>
                <ButtonFavorite isFavorite={isFavorite} onButtonFavoriteClick={() => {
                  onButtonFavoriteClick(id, isFavorite);
                }}/>
                {isAuthorized ?
                  <Link className="btn movie-card__button"
                    to={AppDynamicRoute.addReview(id)}
                  >
                    Add review
                  </Link> :
                  null
                }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={poster} alt="The Grand Budapest Hotel poster" width="218" height="327"/>
            </div>

            <div className="movie-card__desc">
              <Tabs>
                <React.Fragment>
                  <div className="movie-rating">
                    <div className="movie-rating__score">{ratingNumber}</div>
                    <p className="movie-rating__meta">
                      <span className="movie-rating__level">{ratingName}</span>
                      <span className="movie-rating__count">{ratingCount} ratings</span>
                    </p>
                  </div>

                  <div className="movie-card__text">
                    <p>{description}</p>

                    <p className="movie-card__director">
                      <strong>Director: {director}</strong>
                    </p>

                    <p className="movie-card__starring">
                      <strong>
                        Starring: {stars.join(`, `)} and other
                      </strong>
                    </p>
                  </div>
                </React.Fragment>
                <div className="movie-card__text movie-card__row">
                  <div className="movie-card__text-col">
                    <p className="movie-card__details-item">
                      <strong className="movie-card__details-name">Director</strong>
                      <span className="movie-card__details-value">{director}</span>
                    </p>
                    <p className="movie-card__details-item">
                      <strong className="movie-card__details-name">Starring</strong>
                      <span className="movie-card__details-value">
                        {stars.map((star, index) => (
                          index < stars.length - 1 ? (
                            <React.Fragment key={index}>
                              {star}, <br/>
                            </React.Fragment>
                          ) :
                            star
                        ))}
                      </span>
                    </p>
                  </div>

                  <div className="movie-card__text-col">
                    <p className="movie-card__details-item">
                      <strong className="movie-card__details-name">Run Time</strong>
                      <span className="movie-card__details-value">{duration}</span>
                    </p>
                    <p className="movie-card__details-item">
                      <strong className="movie-card__details-name">Genre</strong>
                      <span className="movie-card__details-value">{genre}</span>
                    </p>
                    <p className="movie-card__details-item">
                      <strong className="movie-card__details-name">Released</strong>
                      <span className="movie-card__details-value">{releaseDate}</span>
                    </p>
                  </div>
                </div>
                <MovieReviews reviews={reviews}/>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <SimilarMovies movies={similarMovies} onCardClick={onCardClick}/>
      </div>
    </React.Fragment>
  );
};

MoviePage.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    isFavorite: PropTypes.bool,
    id: PropTypes.number,
    name: PropTypes.string,
    genre: PropTypes.string,
    releaseDate: PropTypes.number,
    rating: PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
      count: PropTypes.number,
    }),
    description: PropTypes.string,
    director: PropTypes.string,
    stars: PropTypes.arrayOf(PropTypes.string),
    posterBig: PropTypes.string,
    poster: PropTypes.string,
    duration: PropTypes.string,
  }).isRequired,
  similarMovies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired
  })).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onButtonPlayClick: PropTypes.func.isRequired,
  onButtonFavoriteClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state),
});

export {MoviePage};
export default connect(mapStateToProps)(React.memo(MoviePage));
