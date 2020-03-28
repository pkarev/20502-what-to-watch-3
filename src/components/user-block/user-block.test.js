import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import UserBlock from './user-block.jsx';
import NameSpace from '../../reducer/name-space';

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
          <Provider store={store}>
            <UserBlock/>
          </Provider>)
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
        <Provider store={store}>
          <UserBlock/>
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

