import React from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';
import IconButton from '@material-ui/core/IconButton';
import * as Icons from '@material-ui/icons';
import { createSelector } from 'reselect';

const IconBtn = ({classes, className, onClick, iconName, color }) => {
  const Icon = Icons[iconName];
  console.log('render IcoButton', Icon);
  return (
    Icon ?
      <IconButton className={className} onClick={onClick} color={color}>
        <Icon/>
      </IconButton>
      : null
  );
};

IconBtn.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  styles: PropTypes.object,
  onClick: PropTypes.func,
  iconName: PropTypes.string,
  color: PropTypes.string,
};

export default onlyUpdateForKeys(['iconName'])(IconBtn);
