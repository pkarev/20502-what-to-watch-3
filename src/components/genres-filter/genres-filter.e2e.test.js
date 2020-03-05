import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenresFilter from './genres-filter.jsx';
import {ALL_GENRES_FILTER} from '../../reducer.js';

Enzyme.configure({
  adapter: new Adapter(),
});

const genresList = [ALL_GENRES_FILTER, `drama`, `comedy`, `action`];

it(`On filter click it calls callsback with correct genre as argument`, () => {
  const onGenresFilterClick = jest.fn();
  const genresFilter = shallow(
      <GenresFilter
        genresList={genresList}
        activeFilter={ALL_GENRES_FILTER}
        onGenresFilterClick={onGenresFilterClick}
      />);
  const links = genresFilter.find(`.catalog__genres-link`);

  links.at(0).simulate(`click`, {preventDefault: () => {}});
  links.at(1).simulate(`click`, {preventDefault: () => {}});

  expect(onGenresFilterClick.mock.calls[0][0]).toEqual(ALL_GENRES_FILTER);
  expect(onGenresFilterClick.mock.calls[1][0]).toEqual(genresList[1]);
});
