import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MoviesList from './movies-list';

Enzyme.configure({
  adapter: new Adapter(),
});

const movies = [
  {
    name: `Fantastic Beasts`,
    poster: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    name: `Bohemian Rhapsody`,
    poster: `/img/bohemian-rhapsody.jpg`,
  },
  {
    name: `Moonrise kindom`,
    poster: `/img/moonrise-kingdom.jpg`
  }
];

it(`Should update activeCard on small card's title hover`, () => {
  const moviesList = mount(<MoviesList movies={movies}/>);
  const secondCardTitle = moviesList.find(`.small-movie-card__link`).at(1);

  secondCardTitle.simulate(`mouseEnter`, {preventDefault: () => {}});
  expect(moviesList.state().activeCard).toMatchObject(movies[1]);
});
