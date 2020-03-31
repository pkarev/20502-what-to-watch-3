import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

const MOVIES_TO_SHOW = 8;

const MoviesList = ({movies, onCardClick}) => {
  const [shownMovies, setShownMovies] = useState([...movies.slice(0, MOVIES_TO_SHOW)]);

  const showMore = () => {
    setShownMovies([
      ...shownMovies,
      ...movies.slice(shownMovies.length, shownMovies.length + MOVIES_TO_SHOW)
    ]);
  };

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {shownMovies.map((movie) => (
          <SmallMovieCard movie={movie} key={movie.id} onCardClick={onCardClick}/>
        ))}
      </div>
      {
        shownMovies.length < movies.length ?
          <div className="catalog__more">
            <button className="catalog__button" type="button" onClick={showMore}>Show more</button>
          </div> :
          null
      }
    </React.Fragment>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  })),
  onCardClick: PropTypes.func,
};

export default React.memo(MoviesList);
