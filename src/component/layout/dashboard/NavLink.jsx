import React from 'react';
import * as MD from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

export default function NavLink(props) {
  return (
    <MD.ListItem
      button
      className={props.className}
      component={Link}
      to={props.to}
      selected={props.location?.pathname === props.to}
    >
      {props.children}
    </MD.ListItem>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  location: PropTypes.object,
  className: PropTypes.string,
};
