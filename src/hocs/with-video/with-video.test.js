import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withVideo from './with-video.jsx';

const MockComponent = ({renderVideo}) => (
  <div>
    {renderVideo({
      src: `/test/src`,
      poster: `/test/poster`,
    })}
  </div>
);

MockComponent.propTypes = {
  renderVideo: PropTypes.func.isRequired,
};

const MockComponentWithVideo = withVideo(MockComponent);
it(`Component with video`, () => {
  const tree = renderer
    .create(
        <MockComponentWithVideo/>, {
          createNodeMock: () => ({}),
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
