import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Icon from '../../../components/Icon';

const Menu = ({ classes, onRedirect, routes, location }) => {
  const { pathname } = location;

  return (
    <List className={classes.menu}>
      {
        routes.map(item => (
          <ListItem
            key={item.url}
            button
            selected={item.url == pathname}
            onClick={onRedirect(item.url)}
          >
            <ListItemIcon>
              <Icon name={item.iconName}/>
            </ListItemIcon>
            <ListItemText inset primary={item.title} />
          </ListItem>
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
