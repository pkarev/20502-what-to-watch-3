import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

const MoviesList = ({movies, onCardClick}) => (
  <div className="catalog__movies-list">
    {movies.map((movie) => (
      <SmallMovieCard movie={movie} key={movie.id} onCardClick={onCardClick}/>
    ))}
  </div>
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  })),
  onCardClick: PropTypes.func,
};

export default MoviesList;
