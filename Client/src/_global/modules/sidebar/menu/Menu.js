import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import MenuItem from './MenuItem';

const Menu = ({ classes, onRedirect, routes, location }) => {

  return (
    <List className={classes.menu}>
      {
        routes.map((item) => (
          <MenuItem
            key={item.url}
            url={item.url}
            iconName={item.iconName}
            title={item.title}
            onRedirect={onRedirect}
            path={location.pathname}
          />
        ))
      }
    </List>
  );
};

Menu.propTypes = {
  classes: PropTypes.object,
  onRedirect: PropTypes.func,
  routes: PropTypes.array,
  location: PropTypes.object,
};

export default withStyles(() => ({
  menu: {
    width: 240,
  }
}))(Menu);
