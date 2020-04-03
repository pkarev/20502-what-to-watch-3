import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withActiveTab from './with-active-tab';

const tabs = [1, 2];

const MockComponent = ({onTabClick}) => (
  <React.Fragment>
    {tabs.map((tab, index) => (
      <div key={index} onClick={() => {
        onTabClick(index);
      }}>
        {tab}
      </div>
    ))}
  </React.Fragment>
);

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onTabClick: PropTypes.func.isRequired,
};

const MockComponentWithActiveTab = withActiveTab(MockComponent);

it(`Render MockComponent with active tab`, () => {
  const tree = renderer
    .create(
        <MockComponentWithActiveTab>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, voluptatem?</p>
        </MockComponentWithActiveTab>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
