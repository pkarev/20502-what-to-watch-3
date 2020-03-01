import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: props.activeTab,
      };

      this._onTabClick = this._onTabClick.bind(this);
    }

    _onTabClick(name) {
      this.setState({activeTab: name});
    }

    render() {
      const {activeTab} = this.state;
      const {children} = this.props;

      return (
        <Component
          {...this.props}
          activeTab={activeTab}
          onTabClick={this._onTabClick}
        >
          {children}
        </Component>
      );
    }
  }

  WithActiveTab.propTypes = {
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
    ]).isRequired
  };

  return WithActiveTab;
};

export default withActiveTab;
