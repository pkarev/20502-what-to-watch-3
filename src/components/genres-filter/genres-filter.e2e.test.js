import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenresFilter from './genres-filter.jsx';
import {ALL_GENRES_FILTER} from '../../reducer.js';

Enzyme.configure({
  adapter: new Adapter(),
});

const movies = [
  {
    id: 3,
    genre: `action`,
  },
  {
    id: 2,
    genre: `comedy`,
  },
  {
    id: 1,
    genre: `drama`,
  },
];

it(`On filter click it calls callsback with correct genre as argument`, () => {
  const onGenresFilterClick = jest.fn();
  const genresFilter = shallow(
      <GenresFilter
        movies={movies}
        genreFilter={movies[0].genre}
        onGenresFilterClick={onGenresFilterClick}
      />);
  const links = genresFilter.find(`.catalog__genres-link`);

  links.at(0).simulate(`click`, {preventDefault: () => {}});
  links.at(1).simulate(`click`, {preventDefault: () => {}});

  expect(onGenresFilterClick.mock.calls[0][0]).toEqual(ALL_GENRES_FILTER);
  expect(onGenresFilterClick.mock.calls[1][0]).toEqual(movies[0].genre);
});
