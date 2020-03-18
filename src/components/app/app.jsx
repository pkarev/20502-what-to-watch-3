import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import Tabs from '../tabs/tabs.jsx';
import {ActionCreator, ALL_GENRES_FILTER} from '../../reducer';

const AppState = {
  MAIN: 1,
  MOVIE_PAGE: 2,
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.MAIN,
    };

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(activeCard) {
    const {setCurrentMovie} = this.props;

    setCurrentMovie(activeCard);
    this.setState({
      appState: AppState.MOVIE_PAGE,
    });
  }

  _renderScreen() {
    const {movies, currentMovie} = this.props;

    switch (this.state.appState) {
      case AppState.MAIN:
        return (
          <Main
            currentMovie={currentMovie}
            onCardClick={this._handleCardClick}
          />
        );

      case AppState.MOVIE_PAGE:
        return (
          <MoviePage movie={currentMovie} similarMovies={movies} onCardClick={this._handleCardClick}/>
        );

      default:
        return null;
    }
  }

  componentDidMount() {
    const {setGenresList, movies} = this.props;
    let genresList = [ALL_GENRES_FILTER];
    movies.map((movie) => {
      genresList.push(movie.genre);
    });
    genresList = Array.from(new Set(genresList)).sort();

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
              <div name="one">1</div>
              <div name="two">2</div>
              <div name="three">3</div>
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
  setGenresList: PropTypes.func.isRequired,
  setCurrentMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  currentMovie: state.currentMovie
});

const mapDispatchToProps = (dispatch) => ({
  setGenresList(genresList) {
    dispatch(ActionCreator.setGenresList(genresList));
  },
  setCurrentMovie(currentMovie) {
    dispatch(ActionCreator.setCurrentMovie(currentMovie));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
