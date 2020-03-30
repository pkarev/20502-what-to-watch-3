import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Tabs from '../tabs/tabs.jsx';
import SimilarMovies from '../similar-movies/similar-movies.jsx';
import UserBlock from '../user-block/user-block.jsx';
import ButtonPlay from '../button-play/button-play.jsx';
import {getAuthStatus} from '../../reducer/user/selectors';
import {AppDynamicRoute} from '../../routes.js';
import history from '../../history.js';

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
      },
      onAddReviewClick,
      similarMovies,
      onCardClick,
      onButtonPlayClick,
    }) => (
  <React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={posterBig} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

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
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              {isAuthorized ?
                <a href="add-review.html" className="btn movie-card__button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onAddReviewClick(id);
                  }}
                >Add review</a> :
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
                    <span className="movie-card__details-value">Wes Andreson</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Starring</strong>
                    <span className="movie-card__details-value">
                      Bill Murray, <br/>
                      Edward Norton, <br/>
                      Jude Law, <br/>
                      Willem Dafoe, <br/>
                      Saoirse Ronan, <br/>
                      Tony Revoloru, <br/>
                      Tilda Swinton, <br/>
                      Tom Wilkinson, <br/>
                      Owen Wilkinson, <br/>
                      Adrien Brody, <br/>
                      Ralph Fiennes, <br/>
                      Jeff Goldblum
                    </span>
                  </p>
                </div>

                <div className="movie-card__text-col">
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Run Time</strong>
                    <span className="movie-card__details-value">1h 39m</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Genre</strong>
                    <span className="movie-card__details-value">Comedy</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Released</strong>
                    <span className="movie-card__details-value">2014</span>
                  </p>
                </div>
              </div>
              <div className="movie-card__reviews movie-card__row">
                <div className="movie-card__reviews-col">
                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the
                        glorious Mittel-European kitsch of one of the director&apos;s funniest and most exquisitely designed
                        movies in years.
                      </p>

                      <footer className="review__details">
                        <cite className="review__author">Kate Muir</cite>
                        <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">8,9</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">Anderson&apos;s films are too precious for some, but for those of us
                        willing to lose ourselves in them, they&apos;re a delight. &apos;The Grand Budapest Hotel&apos; is no
                        different, except that he has added a hint of gravitas to the mix, improving the recipe.
                      </p>

                      <footer className="review__details">
                        <cite className="review__author">Bill Goodykoontz</cite>
                        <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">8,0</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">I didn&apos;t find it amusing, and while I can appreciate the creativity,
                        it&apos;s an hour and 40 minutes I wish I could take back.</p>

                      <footer className="review__details">
                        <cite className="review__author">Amanda Greever</cite>
                        <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">8,0</div>
                  </div>
                </div>
                <div className="movie-card__reviews-col">
                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally
                        silly, and here and there, gruesome and/or heartbreaking.</p>

                      <footer className="review__details">
                        <cite className="review__author">Matthew Lickona</cite>
                        <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">7,2</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">It is certainly a magical and childlike way of storytelling, even if
                        the content is a little more adult.</p>

                      <footer className="review__details">
                        <cite className="review__author">Paula Fleri-Soler</cite>
                        <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">7,6</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">It is certainly a magical and childlike way of storytelling, even if
                        the content is a little more adult.</p>

                      <footer className="review__details">
                        <cite className="review__author">Paula Fleri-Soler</cite>
                        <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">7,0</div>
                  </div>
                </div>
              </div>
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

MoviePage.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
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
  }).isRequired,
  similarMovies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired
  })).isRequired,
  onAddReviewClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onButtonPlayClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state),
});

const mapDispatchToProps = () => ({
  onAddReviewClick(id) {
    history.push(AppDynamicRoute.addReview(id));
  },
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MoviePage));
