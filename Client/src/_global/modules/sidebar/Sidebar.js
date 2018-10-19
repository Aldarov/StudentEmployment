import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { Menu } from './menu';

const Sidebar = ({ classes, show, onClose }) => {
  return (
    <Drawer
      open={show}
      onClose={onClose}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider/>
      <Menu/>
    </Drawer>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object,
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default withStyles(theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
}))(Sidebar);
