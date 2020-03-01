import React from 'react';
import PropTypes from 'prop-types';
import withActiveTab from '../../hocs/with-active-tab/with-active-tab.jsx';

const tabNames = [`Overview`, `Details`, `Reviews`];

const Tabs = ({activeTab, children, onTabClick}) => (
  <React.Fragment>
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {React.Children.map(children, (child, index) => {
          return (
            <li className={`movie-nav__item${index === activeTab ? ` movie-nav__item--active` : ``}`} key={name}>
              <a href="#" className="movie-nav__link" onClick={(evt) => {
                evt.preventDefault();
                onTabClick(index);
              }}>
                {tabNames[index]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
    {children[activeTab]}
  </React.Fragment>
);

Tabs.propTypes = {
  activeTab: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default withActiveTab(Tabs);
