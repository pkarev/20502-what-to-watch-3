import React from 'react';
import renderer from 'react-test-renderer';
import GenresFilter from './genres-filter.jsx';
import {ALL_GENRES_FILTER} from '../../reducer';

const genresList = [ALL_GENRES_FILTER, `action`, `comedy`, `drama`];

it(`Render GenresFilter`, () => {
  const tree = renderer
    .create(<GenresFilter genresList={genresList} activeFilter="drama" onGenresFilterClick={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
