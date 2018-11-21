import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '../../../components/Icon';

const MenuItem = ({ iconName, url, title, onRedirect, path }) => {
  return (
    <ListItem
      button
      selected={url == path}
      onClick={onRedirect(url)}
    >
      <ListItemIcon>
        <Icon name={iconName}/>
      </ListItemIcon>
      <ListItemText inset primary={title} />
    </ListItem>
  );
};

MenuItem.propTypes = {
  classes: PropTypes.object,
  iconName: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  onRedirect: PropTypes.func,
  path: PropTypes.string,
};

export default MenuItem;
