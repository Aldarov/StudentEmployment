import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '../../components/IconBtn';

import { Menu } from './menu';

const Sidebar = ({ classes, show, onClose }) => {
  console.log('Render Sidebar', show);
  return (
    <Drawer
      open={show}
      onClose={onClose}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose} iconName='ChevronLeft' />
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
  },
  buttonColor: {
    color: 'black'
  },
}))(Sidebar);
