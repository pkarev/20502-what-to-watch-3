import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import AddReview from './add-review.jsx';
import NameSpace from '../../reducer/name-space';

const mockStore = configureStore([]);

const movie = {
  name: `The Grand Budapest Hotel`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  posterBig: `img/bg-the-grand-budapest-hotel.jpg`,
  id: 10,
};

it(`Render Component`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      isAuthorized: false,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <AddReview movie={movie} onCommentPost={() => {}}/>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
