import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './video-player';

const movie = {
  trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`VideoPlayer should toggle isPlaying state on mouseEnter / mouseLeave`, () => {
  const videoPlayer = mount(<VideoPlayer
    src={`${movie.trailer}`}
    poster={`${movie.poster}`}
  />);

  videoPlayer.simulate(`mouseEnter`);
  setTimeout(() => {
    expect(videoPlayer.state(`isPlaying`)).toBe(true);
  }, 1000);
  videoPlayer.simulate(`mouseLeave`);
  setTimeout(() => {
    expect(videoPlayer.state(`isPlaying`)).toBe(false);
  }, 1000);
});
