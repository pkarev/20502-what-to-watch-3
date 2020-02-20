import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallMovieCard from './small-movie-card';

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  name: `Fantastic Beasts`,
  poster: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`When user clicks card, callback gets current movie as argument`, () => {
  const captionHoverHandler = jest.fn();
  const smallMovieCardComponent = shallow(<SmallMovieCard movie={movie} onCardClick={captionHoverHandler}/>);
  const smallMovieCard = smallMovieCardComponent.find(`.small-movie-card__image`);

  smallMovieCard.simulate(`click`, {preventDefault: () => {}});

  expect(captionHoverHandler.mock.calls[0][0]).toMatchObject(movie);
});
