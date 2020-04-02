import React from 'react';
import renderer from 'react-test-renderer';
import Player from './player.jsx';

const movie = {
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  posterBig: `img/bg-the-grand-budapest-hotel.jpg`,
};

it(`Render Player`, () => {
  const tree = renderer
    .create(
        <Player movie={movie} onPlayerExitClick={() => {}}/>, {
          createNodeMock: () => ({}),
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
