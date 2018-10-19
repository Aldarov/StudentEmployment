import React from 'react';
import PropTypes from 'prop-types';
import * as IconsArray from '@material-ui/icons';

const Icons = ({ name }) => {
  const Icon = IconsArray[name];
  return Icon ? <Icon/> : null;
};

Icons.propTypes = {
  name: PropTypes.string,
};

export default Icons;
