import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import MyList from './my-list.jsx';
import history from '../../history.js';
import NameSpace from '../../reducer/name-space';

const mockStore = configureStore([]);

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `/img/bohemian-rhapsody.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    previewImage: `/img/moonrise-kingdom.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  }
];

it(`Render MyList`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      isAuthorized: true,
      user: {
        [`avatar_url`]: `img/avatar.jpg`,
      },
    }
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MyList movies={movies} onCardClick={() => {}}/>
          </Provider>
        </Router>, {
          createNodeMock: () => ({})
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
