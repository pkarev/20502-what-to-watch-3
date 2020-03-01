import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: 0,
      };

      this._onTabClick = this._onTabClick.bind(this);
    }

    _onTabClick(index) {
      this.setState({activeTab: index});
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
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
  };

  return WithActiveTab;
};

export default withActiveTab;
