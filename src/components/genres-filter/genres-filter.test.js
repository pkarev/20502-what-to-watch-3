import React from 'react';
import renderer from 'react-test-renderer';
import GenresFilter from './genres-filter.jsx';

const movies = [
  {
    id: 1,
    genre: `drama`,
  },
  {
    id: 2,
    genre: `comedy`,
  },
  {
    id: 3,
    genre: `action`,
  }
];

it(`Render GenresFilter`, () => {
  const tree = renderer
    .create(<GenresFilter movies={movies} genreFilter="drama" onGenresFilterClick={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
