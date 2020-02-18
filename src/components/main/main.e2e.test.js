import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main';

Enzyme.configure({
  adapter: new Adapter(),
});

const movies = [
  {
    name: `One`,
    id: 1
  },
  {
    name: `Two`,
    id: 2
  },
  {
    name: `Three`,
    id: 3
  },
];

const currentMovie = {
  genre: `Awesome genre`,
  releaseDate: 2020
};

it(`Shoul call callback function on small card's heading click`, () => {
  const movieCaptionClickHandler = jest.fn();

  const main = shallow(
      <Main
        currentMovie={currentMovie}
        movies={movies}
        onMovieCaptionClick={movieCaptionClickHandler}
      />
  );

  const headings = main.find(`.small-movie-card__link`);

  headings.at(0).simulate(`click`, {preventDefault: () => {}});
  expect(movieCaptionClickHandler.mock.calls.length).toBe(1);
});
