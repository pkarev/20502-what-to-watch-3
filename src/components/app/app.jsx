import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';

const App = ({currentMovie, movies}) => <Main currentMovie={currentMovie} movies={movies}/>;

App.propTypes = {
  currentMovie: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  }),
  movies: PropTypes.arrayOf(PropTypes.string),
};

export default App;
