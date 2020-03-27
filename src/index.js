import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import reducer from './reducer/reducer.js';
import {createAPI} from './api.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {ActionCreator, Screen} from './reducer/app-state/app-state.js';

const onUnauthorized = () => {};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

Promise.all([
  store.dispatch(DataOperation.loadMovies()),
  store.dispatch(DataOperation.loadPromoMovie())
])
  .catch(() => {
    store.dispatch(ActionCreator.setActiveScreen(Screen.ERROR_PAGE));
  })
  .finally(() => {
    ReactDOM.render(
        <Provider store={store}>
          <App/>
        </Provider>,
        document.getElementById(`root`)
    );
  });
