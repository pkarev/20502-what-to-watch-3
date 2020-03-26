import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import Tabs from '../tabs/tabs.jsx';
import {ActionCreator, Screen, ALL_GENRES_FILTER} from '../../reducer';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(activeCard) {
    const {setCurrentMovie, setActiveScreen} = this.props;

    setCurrentMovie(activeCard);
    setActiveScreen(Screen.MOVIE_PAGE);
  }

  _renderScreen() {
    const {movies, currentMovie, activeScreen} = this.props;

    switch (activeScreen) {
      case Screen.MAIN:
        return (
          <Main
            currentMovie={currentMovie}
            onCardClick={this._handleCardClick}
          />
        );

      case Screen.MOVIE_PAGE:
        return (
          <MoviePage movie={currentMovie} similarMovies={movies} onCardClick={this._handleCardClick}/>
        );

      default:
        return null;
    }
  }

  componentDidMount() {
    const {setGenresList, movies} = this.props;
    let genresList = [];
    movies.map((movie) => {
      genresList.push(movie.genre);
    });
    genresList = [ALL_GENRES_FILTER, ...Array.from(new Set(genresList)).sort()];

    setGenresList(genresList);
  }

  render() {
    const {movies, currentMovie} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePage movie={currentMovie} similarMovies={movies} onCardClick={this._handleCardClick}/>
          </Route>
          <Route exact path="/dev-tabs">
            <Tabs activeTab="one">
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </Tabs>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  })),
  currentMovie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  }),
  activeScreen: PropTypes.number.isRequired,
  setGenresList: PropTypes.func.isRequired,
  setCurrentMovie: PropTypes.func.isRequired,
  setActiveScreen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  currentMovie: state.currentMovie,
  activeScreen: state.activeScreen
});

const mapDispatchToProps = (dispatch) => ({
  setGenresList(genresList) {
    dispatch(ActionCreator.setGenresList(genresList));
  },
  setCurrentMovie(currentMovie) {
    dispatch(ActionCreator.setCurrentMovie(currentMovie));
  },
  setActiveScreen(screen) {
    dispatch(ActionCreator.setActiveScreen(screen));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
