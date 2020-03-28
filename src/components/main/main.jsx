import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MoviesList from '../movies-list/movies-list.jsx';
import GenresFilter from '../genres-filter/genres-filter.jsx';
import UserBlock from '../user-block/user-block.jsx';
import {ActionCreator, Screen} from '../../reducer/app-state/app-state.js';
import {getActiveGenreFilter} from '../../reducer/app-state/selectors.js';
import {getGenresList, getFilteredMovies, getPromoMovie} from '../../reducer/data/selectors.js';
import {getAuthStatus} from '../../reducer/user/selectors.js';

const Main = ({
  promoMovie: {genre, releaseDate},
  filteredMovies,
  activeGenreFilter,
  onCardClick,
  onGenresFilterClick,
  genresList,
  isAuthorized,
  onSignInClick
}) => (
  <React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <UserBlock isAuthorized={isAuthorized} onSignInClick={onSignInClick}/>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
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
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenresFilter
          genresList={genresList}
          activeFilter={activeGenreFilter}
          onGenresFilterClick={onGenresFilterClick}
        />

        <MoviesList movies={filteredMovies} onCardClick={onCardClick}/>

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>
);

Main.propTypes = {
  promoMovie: PropTypes.shape({
    genre: PropTypes.string,
    releaseDate: PropTypes.number,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onGenresFilterClick: PropTypes.func.isRequired,
  activeGenreFilter: PropTypes.string.isRequired,
  filteredMovies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  })),
  genresList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSignInClick: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  filteredMovies: getFilteredMovies(state),
  activeGenreFilter: getActiveGenreFilter(state),
  genresList: getGenresList(state),
  promoMovie: getPromoMovie(state),
  isAuthorized: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenresFilterClick(filter) {
    dispatch(ActionCreator.setGenresFilter(filter));
  },
  onSignInClick() {
    dispatch(ActionCreator.setActiveScreen(Screen.SIGN_IN_PAGE));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main));
