import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import ErrorPage from '../error-page/error-page.jsx';
import Tabs from '../tabs/tabs.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import AddReview from '../add-review/add-review.jsx';
import {ActionCreator as AppStateActionCreator, Screen} from '../../reducer/app-state/app-state.js';
import {getActiveScreen, getActiveMovie} from '../../reducer/app-state/selectors.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getPromoMovie, getMovies} from '../../reducer/data/selectors.js';
import {Operation} from '../../reducer/user/user.js';
import {ActionCreator, AuthStatus} from '../../reducer/user/user';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(activeCard) {
    const {setActiveMovie, setActiveScreen} = this.props;

    setActiveMovie(activeCard);
    setActiveScreen(Screen.MOVIE_PAGE);
  }

  _renderScreen() {
    const {movies, activeMovie, activeScreen, onSignInSubmit, onCommentPost} = this.props;

    switch (activeScreen) {
      case Screen.MAIN:
        return (
          <Main
            onCardClick={this._handleCardClick}
          />
        );

      case Screen.MOVIE_PAGE:
        return (
          <MoviePage movie={activeMovie} similarMovies={movies} onCardClick={this._handleCardClick}/>
        );

      case Screen.ERROR_PAGE:
        return <ErrorPage/>;

      case Screen.SIGN_IN_PAGE:
        return <SignIn onSignInSubmit={onSignInSubmit}/>;

      case Screen.ADD_REVIEW_PAGE:
        return <AddReview movie={activeMovie} onCommentPost={onCommentPost}/>;

      default:
        return null;
    }
  }

  render() {
    const {movies, activeMovie} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePage movie={activeMovie} similarMovies={movies} onCardClick={this._handleCardClick}/>
          </Route>
          <Route exact path="/dev-tabs">
            <Tabs activeTab="one">
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </Tabs>
          </Route>
          <Route exact path="/dev-sign-in">
            <SignIn onSignInSubmit={() => {}}/>
          </Route>
          <Route exact path="/dev-review">
            <AddReview id={1} onCommentPost={() => {}}/>
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
  activeMovie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  }),
  promoMovie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  }),
  activeScreen: PropTypes.number.isRequired,
  setActiveMovie: PropTypes.func.isRequired,
  setActiveScreen: PropTypes.func.isRequired,
  onSignInSubmit: PropTypes.func.isRequired,
  onCommentPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  activeMovie: getActiveMovie(state),
  promoMovie: getPromoMovie(state),
  activeScreen: getActiveScreen(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveMovie(movie) {
    dispatch(AppStateActionCreator.setActiveMovie(movie));
  },
  setActiveScreen(screen) {
    dispatch(AppStateActionCreator.setActiveScreen(screen));
  },
  onSignInSubmit(email, password) {
    return dispatch(Operation.tryAuth(email, password))
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.setAuthStatus(AuthStatus.AUTH));
          dispatch(AppStateActionCreator.setActiveScreen(Screen.MAIN));
        }
      });
  },
  onCommentPost(id, commentPost) {
    return dispatch(DataOperation.postComment(id, commentPost))
      .then((response) => {
        if (response.status === 200) {
          dispatch(AppStateActionCreator.setActiveScreen(Screen.MOVIE_PAGE));
        }
      });
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
