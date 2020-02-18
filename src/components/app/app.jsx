import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';

const App = ({currentMovie, movies}) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Main
          currentMovie={currentMovie}
          movies={movies}
          onMovieCaptionClick={() => {}}
        />
      </Route>
      <Route exact path="/dev-movie-page">
        <MoviePage/>
      </Route>
    </Switch>
  </BrowserRouter>
);

App.propTypes = {
  currentMovie: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  }),
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  })),
};

export default App;
