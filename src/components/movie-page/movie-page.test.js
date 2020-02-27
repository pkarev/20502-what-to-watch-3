import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page';

const movie = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  posterBig: `img/bg-the-grand-budapest-hotel.jpg`,
  posterSmall: `img/the-grand-budapest-hotel-poster.jpg`,
  trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  releaseDate: 2014,
  rating: {
    number: `8,9`,
    name: `Very good`,
    count: 240,
  },
  description: [
    `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
  ],
  director: `Wes Andreson`,
  stars: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
};

it(`Render MoviePage`, () => {
  const tree = renderer
    .create(<MoviePage movie={movie}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
