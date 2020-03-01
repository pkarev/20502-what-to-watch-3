import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: 0,
      };

      this._handleTabClick = this._handleTabClick.bind(this);
    }

    _handleTabClick(index) {
      this.setState({activeTab: index});
    }

    render() {
      const {activeTab} = this.state;
      const {children} = this.props;

      return (
        <Component
          {...this.props}
          activeTab={activeTab}
          onTabClick={this._handleTabClick}
        >
          {children}
        </Component>
      );
    }
  }

  WithActiveTab.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
  };

  return WithActiveTab;
};

export default withActiveTab;
