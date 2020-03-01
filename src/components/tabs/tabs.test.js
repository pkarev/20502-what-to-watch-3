import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs';

const tabs = [
  {
    name: `firstTab`,
  },
  {
    name: `secondTab`,
  }
];

it(`Render Component`, () => {
  const tree = renderer
  .create(
      <Tabs activeTab={`${tabs[0].name}`}>
        {tabs.map((tab) => (
          <div name={tab.name} key={tab.name}>
            {tab.name}
          </div>
        ))}
      </Tabs>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
