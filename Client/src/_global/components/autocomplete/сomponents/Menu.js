import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';
import Paper from '@material-ui/core/Paper';

const styles = {
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 3,
    left: 0,
    right: 0,
  }
};

class Menu extends Component {
  render() {
    const { innerProps: { onMouseDown }, children } = this.props;

    return (
      <Paper
        square
        onMouseDown={onMouseDown}
        style={styles.paper}
      >
        {children}
      </Paper>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object,
  selectProps: PropTypes.object,
  innerProps: PropTypes.object,
  children: PropTypes.any,
};

export default onlyUpdateForKeys(['children'])(Menu);
