import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

const MAX_CARDS_TO_STHOW = 4;

const SimilarMovies = ({movies, onCardClick}) => {
  const renderedMovies = movies.length > MAX_CARDS_TO_STHOW ? movies.slice(0, MAX_CARDS_TO_STHOW) : movies;

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__movies-list">
        {renderedMovies.map((movie) => (
          <SmallMovieCard movie={movie} key={movie.id} onCardClick={onCardClick}/>
        ))}
      </div>
    </section>
  );
};

SimilarMovies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterSmall: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired
  })),
  onCardClick: PropTypes.func.isRequired,
};

export default SimilarMovies;
