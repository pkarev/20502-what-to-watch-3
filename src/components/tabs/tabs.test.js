import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs';
import Tab from './tab';

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
          <Tab name={tab.name} key={tab.name}>
            <div>
              {tab.name}
            </div>
          </Tab>
        ))}
      </Tabs>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
