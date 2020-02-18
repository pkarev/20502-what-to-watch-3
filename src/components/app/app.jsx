import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';

const AppState = {
  MAIN: 1,
  MOVIE_PAGE: 2,
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.MAIN,
      currentMovie: this.props.movies[0],
    };

    this._handleActiveCardClick = this._handleActiveCardClick.bind(this);
  }

  _handleActiveCardClick({activeCard}) {
    this.setState({
      currentMovie: activeCard,
      appState: AppState.MOVIE_PAGE,
    });
  }

  _renderScreen() {
    const {movies} = this.props;
    const {currentMovie} = this.state;

    switch (this.state.appState) {
      case AppState.MAIN:
        return (
          <Main
            currentMovie={currentMovie}
            movies={movies}
            onMovieCaptionClick={() => {}}
            handleActiveCardChange={this._handleActiveCardClick}
          />
        );

      case AppState.MOVIE_PAGE:
        return (
          <MoviePage movie={currentMovie}/>
        );

      default:
        return null;
    }
  }

  render() {
    const {currentMovie} = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePage movie={currentMovie}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

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
