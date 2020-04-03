import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import shuffle from 'lodash/shuffle';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import ErrorPage from '../error-page/error-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import AddReview from '../add-review/add-review.jsx';
import Player from '../player/player.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import MyList from '../my-list/my-list.jsx';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getPromoMovie, getMovies, getFavoriteMovies} from '../../reducer/data/selectors.js';
import {Operation as UserOperatopn} from '../../reducer/user/user.js';
import {getAuthStatus} from '../../reducer/user/selectors.js';
import history from '../../history.js';
import {AppDynamicRoute} from '../../routes.js';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handlePlayClick = this._handlePlayClick.bind(this);
  }

  _handleCardClick(movie) {
    history.push(AppDynamicRoute.film(movie.id));
  }

  _handlePlayClick(id) {
    history.push(AppDynamicRoute.player(id));
  }

  render() {
    const {
      isAuthorized,
      movies,
      favoriteMovies,
      onSignInSubmit,
      onButtonFavoriteClick,
      onCommentPost,
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Main
              onCardClick={this._handleCardClick}
              onButtonPlayClick={this._handlePlayClick}
              onButtonFavoriteClick={onButtonFavoriteClick}
            />
          </Route>
          <Route exact path="/login">
            <SignIn onSignInSubmit={onSignInSubmit}/>
          </Route>
          <PrivateRoute exact path="/films/:id/review"
            isAuthorized={isAuthorized}
            render={(props) => {
              return (
                <AddReview
                  movie={movies.find((movie) => movie.id === Number(props.match.params.id))}
                  onCommentPost={onCommentPost}
                />
              );
            }}
          />
          <Route exact path="/films/:id"
            render={(props) => {
              const currentMovie = movies.find((movie) => movie.id === Number(props.match.params.id));
              const similarMovies = movies.filter((movie) => {
                return currentMovie.genre === movie.genre && currentMovie.id !== movie.id;
              });
              return (
                <MoviePage
                  movie={currentMovie}
                  similarMovies={shuffle(similarMovies)}
                  onCardClick={this._handleCardClick}
                  onButtonPlayClick={() => {
                    this._handlePlayClick(props.match.params.id);
                  }}
                  onButtonFavoriteClick={onButtonFavoriteClick}
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
          <PrivateRoute isAuthorized={isAuthorized} path="/mylist" exact render={() => (
            <MyList
              movies={favoriteMovies}
              onCardClick={this._handleCardClick}
            />
          )}/>
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
  favoriteMovies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  })),
  promoMovie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  }),
  onSignInSubmit: PropTypes.func.isRequired,
  onCommentPost: PropTypes.func.isRequired,
  onButtonFavoriteClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state),
  movies: getMovies(state),
  promoMovie: getPromoMovie(state),
  favoriteMovies: getFavoriteMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSignInSubmit(email, password) {
    dispatch(UserOperatopn.tryAuth(email, password));
  },
  onCommentPost(id, commentPost) {
    dispatch(DataOperation.postComment(id, commentPost));
  },
  onButtonFavoriteClick(id, isFavorite) {
    dispatch(DataOperation.addToFavorites(id, isFavorite));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
