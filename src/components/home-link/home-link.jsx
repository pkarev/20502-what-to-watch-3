import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../routes';
import PropTypes from 'prop-types';

const HomeLink = ({linkClass}) => (
  <div className="logo">
    <Link className={`logo__link${linkClass ? ` ${linkClass}` : ``}`} to={AppRoute.MAIN}>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);

HomeLink.propTypes = {
  linkClass: PropTypes.string,
};

export default HomeLink;
