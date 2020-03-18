import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withVideo from './with-video.jsx';

const MockComponent = ({renderVideo}) => (
  <React.Fragment>
    {renderVideo(movie.trailer, movie.poster, `small-movie-card__image`)}
  </React.Fragment>
);

MockComponent.propTypes = {
  renderVideo: PropTypes.func.isRequired,
};

const MockComponentWithVideo = withVideo(MockComponent);

const movie = {
  trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`VideoPlayer should toggle isPlaying state on mouseEnter / mouseLeave`, () => {
  const mockComponentWithVideo = mount(
      <MockComponentWithVideo/>, {
        createNodeMock: () => ({})
      }
  );

  mockComponentWithVideo.simulate(`mouseEnter`);
  setTimeout(() => {
    expect(mockComponentWithVideo.state(`isPlaying`)).toBe(true);
  }, 1000);
  mockComponentWithVideo.simulate(`mouseLeave`);
  setTimeout(() => {
    expect(mockComponentWithVideo.state(`isPlaying`)).toBe(false);
  }, 1000);
});
