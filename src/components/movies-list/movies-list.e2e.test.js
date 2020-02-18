import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MoviesList from './movies-list';

Enzyme.configure({
  adapter: new Adapter(),
});

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    poster: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    poster: `/img/bohemian-rhapsody.jpg`,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    poster: `/img/moonrise-kingdom.jpg`
  }
];

it(`Should update activeCard on small card click`, () => {
  const moviesList = mount(<MoviesList movies={movies} onCardClick={() => {}}/>);
  const secondCard = moviesList.find(`.small-movie-card__image`).at(1);

  secondCard.simulate(`click`, {preventDefault: () => {}});
  expect(moviesList.state().activeCard).toMatchObject(movies[1]);
});
