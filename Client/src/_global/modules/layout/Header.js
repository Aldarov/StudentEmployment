import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForKeys, pure } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { leftPartHeaderSelector, centerPartHeaderSelector, rightPartHeaderSelector } from './selectors';
import { connect } from 'react-redux';

const Header = ({
  classes, leftPart, centerPart, rightPart, visiable = true
}) => {
  console.log('Layout Header', leftPart);
  return (
    visiable ?
      <AppBar className={classes.appBar}>
        <Toolbar disableGutters={true}>
          {leftPart && <div className={classes.left}> {leftPart} </div>}
          {centerPart && <div className={classes.center}> {centerPart} </div>}
          {rightPart && <div className={classes.right}> {rightPart} </div>}
        </Toolbar>
      </AppBar>
      : null
  );
};

Header.propTypes = {
  classes: PropTypes.object,
  visiable: PropTypes.bool,
  leftPart: PropTypes.element,
  centerPart: PropTypes.element,
  rightPart: PropTypes.element,
};

export default compose(
  // connect((state, props) => ({
  //   leftPart: leftPartHeaderSelector(state, props),
  //   rightPart: rightPartHeaderSelector(state, props),
  //   centerPart: centerPartHeaderSelector(state, props)
  // })),
  onlyUpdateForKeys([]),
  withStyles(() => ({
    appBar: {
      position: 'static'
    },
    left: {
      marginLeft: 10,
    },
    center: {
      marginLeft: 20,
      marginRight: 20,
      flex: 1,
    },
    right: {
      marginRight: 10,
    }
  }))
)(Header);
