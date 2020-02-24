import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';

const movie = {
  trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
};

it(`Render VideoPlayer`, () => {
  const tree = renderer
  .create(
      <VideoPlayer
        src={`${movie.trailer}`}
        poster={`${movie.poster}`}
      />, {
        createNodeMock: () => ({})
      })
  .toJSON();

  expect(tree).toMatchSnapshot();
});
