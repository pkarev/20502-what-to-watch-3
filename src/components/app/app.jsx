import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import ErrorPage from '../error-page/error-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import AddReview from '../add-review/add-review.jsx';
import Player from '../player/player.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import {Operation as DataOperation, ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {getPromoMovie, getMovies} from '../../reducer/data/selectors.js';
import {Operation, ActionCreator, AuthStatus} from '../../reducer/user/user.js';
import {getAuthStatus} from '../../reducer/user/selectors.js';
import history from '../../history.js';
import {AppRoute, AppDynamicRoute} from '../../routes.js';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(movie) {
    history.push(AppDynamicRoute.film(movie.id));
  }

  render() {
    const {movies, onSignInSubmit, isAuthorized} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Main onCardClick={this._handleCardClick}/>
          </Route>
          <Route exact path="/login">
            <SignIn onSignInSubmit={onSignInSubmit}/>
          </Route>
          <PrivateRoute exact path="/films/:id/review"
            isAuthorized={isAuthorized}
            component={AddReview}
            render={(props) => {
              return (
                <AddReview
                  movie={movies.find((movie) => movie.id === Number(props.match.params.id))}
                  onCommentPost={() => {}}
                />
              );
            }}
          />
          <Route exact path="/films/:id"
            render={(props) => {
              return (
                <MoviePage
                  movie={movies.find((movie) => movie.id === Number(props.match.params.id))}
                  similarMovies={movies}
                  onCardClick={this._handleCardClick}
                />
              );
            }}
          />
          <Route exact path="/player/:id"
            render={(props) => (
              <Player
                movie={movies.find((movie) => movie.id === Number(props.match.params.id))}
                onPlayerExitClick={history.goBack}
              />
            )}
          />
          <Route exact path="/error">
            <ErrorPage/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  })),
  promoMovie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  }),
  setPromoMovie: PropTypes.func.isRequired,
  onSignInSubmit: PropTypes.func.isRequired,
  onCommentPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  promoMovie: getPromoMovie(state),
  isAuthorized: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  setPromoMovie(movie) {
    dispatch(DataActionCreator.setPromoMovie((movie)));
  },
  onSignInSubmit(email, password) {
    return dispatch(Operation.tryAuth(email, password))
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.setAuthStatus(AuthStatus.AUTH));
          history.goBack();
        }
      });
  },
  onCommentPost(id, commentPost) {
    return dispatch(DataOperation.postComment(id, commentPost))
      .then((response) => {
        if (response.status === 200) {
          history.push(AppRoute.MAIN);
        }
      });
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
