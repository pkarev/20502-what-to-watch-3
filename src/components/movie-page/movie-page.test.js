import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MoviePage from './movie-page.jsx';
import NameSpace from '../../reducer/name-space';
import history from '../../history.js';

const movie = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  posterBig: `img/bg-the-grand-budapest-hotel.jpg`,
  releaseDate: 2014,
  rating: {
    number: 8.9,
    name: `Very good`,
    count: 240,
  },
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  stars: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
};

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

const mockStore = configureStore([]);

it(`Render MoviePage`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      isAuthorized: true,
    }
  });
  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MoviePage movie={movie} similarMovies={movies} onCardClick={() => {}}/>
          </Provider>
        </Router>,
        {
          createNodeMock: () => ({})
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
