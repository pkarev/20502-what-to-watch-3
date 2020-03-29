import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import ErrorPage from '../error-page/error-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import AddReview from '../add-review/add-review.jsx';
import {Operation as DataOperation, ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {getPromoMovie, getMovies} from '../../reducer/data/selectors.js';
import {Operation, ActionCreator, AuthStatus} from '../../reducer/user/user.js';
import history from '../../history.js';
import {AppRoute} from '../../routes.js';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(movie) {
    const {setPromoMovie} = this.props;

    setPromoMovie(movie);
    history.push(AppRoute.MOVIE_PAGE);
  }

  render() {
    const {movies, promoMovie, onSignInSubmit} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Main onCardClick={this._handleCardClick}/>
          </Route>
          <Route exact path="/movie-page">
            <MoviePage movie={promoMovie} similarMovies={movies} onCardClick={this._handleCardClick}/>
          </Route>
          <Route exact path="/login">
            <SignIn onSignInSubmit={onSignInSubmit}/>
          </Route>
          <Route exact path="/review/:id"
            render={(props) => {
              return (
                <AddReview
                  movie={movies.find((movie) => movie.id === Number(props.match.params.id))}
                  onCommentPost={() => {}}
                />
              );
            }}
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
