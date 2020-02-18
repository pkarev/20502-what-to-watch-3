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

it(`Whet user clicks on heading, callback gets current movie as argument`, () => {
  const captionClickHandler = jest.fn();
  const smallMovieCard = shallow(<SmallMovieCard movie={movie} handleCaptionClick={captionClickHandler}/>);
  const link = smallMovieCard.find(`.small-movie-card__link`);

  link.simulate(`click`, {preventDefault: () => {}});

  expect(captionClickHandler.mock.calls[0][0]).toMatchObject(movie);
});
