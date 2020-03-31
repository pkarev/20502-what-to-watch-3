import React from 'react';
import PropTypes from 'prop-types';
import MoviesList from '../movies-list/movies-list.jsx';
import HomeLink from '../home-link/home-link.jsx';

const MyList = ({movies, onCardClick}) => (
  <div className="user-page">
    <header className="page-header user-page__head">
      <HomeLink/>

      <h1 className="page-title user-page__title">My list</h1>

      <div className="user-block">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
        </div>
      </div>
    </header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <MoviesList movies={movies} onCardClick={onCardClick}/>
    </section>

    <footer className="page-footer">
      <HomeLink linkClass="logo__link--light"/>

      <div className="copyright">
        <p>© 2020 What to watch Ltd.</p>
      </div>
    </footer>
  </div>
);

MyList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired
  })),
  onCardClick: PropTypes.func.isRequired,
};

export default MyList;
