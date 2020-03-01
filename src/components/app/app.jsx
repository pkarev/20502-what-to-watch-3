import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import VideoPlayer from '../video-player/video-player.jsx';
import Tabs from '../tabs/tabs.jsx';

const AppState = {
  MAIN: 1,
  MOVIE_PAGE: 2,
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.MAIN,
      currentMovie: props.movies[0],
    };

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(activeCard) {
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

  render() {
    const {movies} = this.props;
    const {currentMovie} = this.state;
    const {trailer, posterSmall} = currentMovie;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePage movie={currentMovie} similarMovies={movies} onCardClick={this._handleCardClick}/>
          </Route>
          <Route exact path="/dev-player">
            <VideoPlayer src={`${trailer}`} poster={`${posterSmall}`} style={{width: `400px`, height: `240px`}}/>
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
};

export default App;
