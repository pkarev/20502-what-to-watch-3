import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app.jsx';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    posterSmall: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Awesome genre`,
    releaseDate: 2020,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    posterSmall: `/img/bohemian-rhapsody.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Drama`,
    releaseDate: 2020,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    posterSmall: `/img/moonrise-kingdom.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Some genre`,
    releaseDate: 2020,
  },
];

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    genreFilter: `all`,
    movies,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App/>
        </Provider>, {
          createNodeMock: () => ({})
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
