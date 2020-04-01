import React from 'react';
import renderer from 'react-test-renderer';
import MovieReviews from './movie-reviews.jsx';

export const reviews = [
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate`
    },
    rating: 9.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate`,
    date: `2019-05-08T14:13:56.569Z`,
  },
  {
    id: 2,
    user: {
      id: 4,
      name: `Muir`
    },
    rating: 3.9,
    comment: `kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`,
  },
  {
    id: 3,
    user: {
      id: 4,
      name: `Kate Muir`
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`,
  },
];

it(`Render Component`, () => {
  const tree = renderer
    .create(<MovieReviews reviews={reviews}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
