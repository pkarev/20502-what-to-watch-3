import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallMovieCard from './small-movie-card';

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  id: 1,
  name: `Fantastic Beasts`,
  posterSmall: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`When user clicks card, callback gets current movie as argument`, () => {
  const captionHoverHandler = jest.fn();
  const smallMovieCardComponent = shallow(<SmallMovieCard movie={movie} onCardClick={captionHoverHandler}/>);
  const smallMovieCard = smallMovieCardComponent.find(`.small-movie-card`);

  smallMovieCard.simulate(`click`, {preventDefault: () => {}, stopPropagation: () => {}});

  expect(captionHoverHandler.mock.calls[0][0]).toMatchObject(movie);
});
