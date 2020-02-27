import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Tab from './tab.jsx';

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.activeTab,
    };
  }

  render() {
    const {activeTab} = this.state;

    return (
      <React.Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {React.Children.map(this.props.children, (child) => {
              return (
                <li className={`movie-nav__item${child.props.name === activeTab ? ` movie-nav__item--active` : ``}`} key={name}>
                  <a href="#" className="movie-nav__link" onClick={(evt) => {
                    evt.preventDefault();
                    this.setState({activeTab: child.props.name});
                  }}>
                    {child.props.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        {React.Children.map(this.props.children, (child) => (
          child.props.name === activeTab ? child : null
        ))}
      </React.Fragment>
    );
  }
}

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf([Tab])
    })),
    PropTypes.shape({
      type: PropTypes.oneOf([Tab])
    })
  ]).isRequired
};

export default Tabs;
