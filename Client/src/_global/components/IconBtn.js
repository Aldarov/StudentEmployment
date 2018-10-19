import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import * as Icons from '@material-ui/icons';
import classNames from 'classnames';

const IconBtn = ({classes, className, onClick, iconName, color }) => {
  const Icon = Icons[iconName];

  return (
    Icon ?
      <IconButton className={classNames(classes.buttonColor, className)} onClick={onClick} color={color}>
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

export default compose(
  onlyUpdateForKeys([]),
  withStyles(() => ({
    buttonColor: {
      color: 'white'
    },
  }))
)(IconBtn);
