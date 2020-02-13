import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = ({currentMovie, movies}) => <Main currentMovie={currentMovie} movies={movies}/>;

App.propTypes = {
  currentMovie: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  }),
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })),
};

export default App;
