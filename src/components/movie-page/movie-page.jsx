import React from 'react';
import PropTypes from 'prop-types';

const MoviePage = (
    {
      movie: {
        name,
        genre,
        releaseDate,
        rating: {number: ratingNumber, name: ratingName, count: ratingCount},
        description,
        director,
        stars,
        posterBig,
        posterSmall,
      }
    }) => (
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

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__desc">
          <h2 className="movie-card__title">{name}</h2>
          <p className="movie-card__meta">
            <span className="movie-card__genre">{genre}</span>
            <span className="movie-card__year">{releaseDate}</span>
          </p>

          <div className="movie-card__buttons">
            <button className="btn btn--play movie-card__button" type="button">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <button className="btn btn--list movie-card__button" type="button">
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"></use>
              </svg>
              <span>My list</span>
            </button>
            <a href="add-review.html" className="btn movie-card__button">Add review</a>
          </div>
        </div>
      </div>
    </div>

    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src={posterSmall} alt="The Grand Budapest Hotel poster" width="218" height="327"/>
        </div>

        <div className="movie-card__desc">
          <nav className="movie-nav movie-card__nav">
            <ul className="movie-nav__list">
              <li className="movie-nav__item movie-nav__item--active">
                <a href="#" className="movie-nav__link">Overview</a>
              </li>
              <li className="movie-nav__item">
                <a href="#" className="movie-nav__link">Details</a>
              </li>
              <li className="movie-nav__item">
                <a href="#" className="movie-nav__link">Reviews</a>
              </li>
            </ul>
          </nav>

          <div className="movie-rating">
            <div className="movie-rating__score">{ratingNumber}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">{ratingName}</span>
              <span className="movie-rating__count">{ratingCount} ratings</span>
            </p>
          </div>

          <div className="movie-card__text">
            {description.map((para, index) => (
              <p key={`${index}-para`}>
                {para}
              </p>
            ))}

            <p className="movie-card__director">
              <strong>Director: {director}</strong>
            </p>

            <p className="movie-card__starring">
              <strong>
                Starring: {stars.join(`, `)} and other
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

MoviePage.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string,
    genre: PropTypes.string,
    releaseDate: PropTypes.number,
    rating: PropTypes.shape({
      number: PropTypes.string,
      name: PropTypes.string,
      count: PropTypes.number,
    }),
    description: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.string,
    stars: PropTypes.arrayOf(PropTypes.string),
    posterBig: PropTypes.string,
    posterSmall: PropTypes.string,
  }).isRequired
};

export default MoviePage;
