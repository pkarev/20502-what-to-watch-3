import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import UserBlock from './user-block.jsx';
import NameSpace from '../../reducer/name-space';
import history from '../../history';

const mockStore = configureStore([]);

describe(`Reder UserBlock`, () => {

  it(`Render sign in link if not authorized`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        isAuthorized: false,
      }
    });

    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <UserBlock/>
            </Provider>
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render user avatar if authorized`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        isAuthorized: true,
      }
    });

    const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <UserBlock/>
          </Provider>
        </Router>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

