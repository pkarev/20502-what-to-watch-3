import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import {createAPI} from './api.js';
import reducer from './reducer/reducer.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {ActionCreator as UserActionCreator, AuthStatus, Operation as UserOperation} from './reducer/user/user.js';
import {ActionCreator as AppStateActionCreator, Screen} from './reducer/app-state/app-state.js';
import {ResponseStatusCode} from './api';

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.setAuthStatus(AuthStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

Promise.all([
  store.dispatch(UserOperation.checkAuth()),
  store.dispatch(DataOperation.loadMovies()),
  store.dispatch(DataOperation.loadPromoMovie()),
])
  .catch(({response}) => {
    if (response.status === ResponseStatusCode.NOT_FOUND) {
      store.dispatch(AppStateActionCreator.setActiveScreen(Screen.ERROR_PAGE));
    }
  })
  .finally(() => {
    ReactDOM.render(
        <Provider store={store}>
          <App/>
        </Provider>,
        document.getElementById(`root`)
    );
  });
