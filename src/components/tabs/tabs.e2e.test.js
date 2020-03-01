import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tabs from './tabs.jsx';

const tabs = [
  {
    name: `first tab`,
  },
  {
    name: `second tab`,
  }
];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Tabs should toggle nav item active class`, () => {
  const tabsComponent = createTabs(tabs, tabs[0].name);
  const navLinks = tabsComponent.find(`.movie-nav__link`);
  let navItems = tabsComponent.find(`.movie-nav__item`);

  expect(navItems.at(0).hasClass(`movie-nav__item--active`)).toBe(true);
  expect(navItems.at(1).hasClass(`movie-nav__item--active`)).toBe(false);

  navLinks.at(1).simulate(`click`);
  navItems = tabsComponent.find(`.movie-nav__item`);

  expect(navItems.at(0).hasClass(`movie-nav__item--active`)).toBe(false);
  expect(navItems.at(1).hasClass(`movie-nav__item--active`)).toBe(true);
});

it(`Tabs should render content for active tab`, () => {
  const tabsComponent = createTabs(tabs, tabs[0].name);
  const navLinks = tabsComponent.find(`.movie-nav__link`);
  let activeTabContent = tabsComponent.find(`.demo-content`).at(0).text();

  expect(activeTabContent).toBe(tabs[0].name);

  navLinks.at(1).simulate(`click`);

  activeTabContent = tabsComponent.find(`.demo-content`).at(0).text();
  expect(activeTabContent).toBe(tabs[1].name);
});

const createTabs = (tabsVal, activeTab) => {
  const tabsComponent = mount(
      <Tabs activeTab={activeTab}>
        {tabsVal.map((tab) => (
          <div className="demo-content" name={tab.name} key={tab.name}>{tab.name}</div>
        ))}
      </Tabs>
  );

  return tabsComponent;
};
