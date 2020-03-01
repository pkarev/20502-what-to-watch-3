import React from 'react';
import PropTypes from 'prop-types';
import withActiveTab from '../../hocs/with-active-tab/with-active-tab.jsx';

const Tabs = ({activeTab, children, onTabClick}) => (
  <React.Fragment>
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {React.Children.map(children, (child) => {
          return (
            <li className={`movie-nav__item${child.props.name === activeTab ? ` movie-nav__item--active` : ``}`} key={name}>
              <a href="#" className="movie-nav__link" onClick={(evt) => {
                evt.preventDefault();
                onTabClick(child.props.name);
              }}>
                {child.props.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
    {React.Children.map(children, (child) => (
      child.props.name === activeTab ? child : null
    ))}
  </React.Fragment>
);

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      props: PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    })),
    PropTypes.shape({
      props: PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    })
  ]).isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default withActiveTab(Tabs);
