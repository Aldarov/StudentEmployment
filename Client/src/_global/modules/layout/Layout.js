import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Header from './Header';
import { BusyIndicator } from '../busyIndicator';
import { Sidebar } from '../sidebar';
import IconBtn from '../../components/IconBtn';
import Title from '../../components/Title';

const Layout = ({
  classes, children, appTitle,
  headerVisiable, headerLeftPart, headerCenterPart, headerRightPart,
  onDefaultHeaderLeftButtonClick
}) => {
  console.log('Layout render', headerCenterPart);
  return (
    <div className={classes.container}>
      <BusyIndicator/>
      <Header
        visiable={headerVisiable}
        leftPart={headerLeftPart || <IconBtn iconName='Menu' onClick={onDefaultHeaderLeftButtonClick} className={classes.leftButton}/>}
        centerPart={headerCenterPart || <Title title={appTitle} />}
        rightPart={headerRightPart}
      />
      <Sidebar/>
      <div className={classes.content} >
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any,
  appTitle: PropTypes.string,

  headerVisiable: PropTypes.bool,
  headerLeftPart: PropTypes.element,
  headerCenterPart: PropTypes.element,
  headerRightPart: PropTypes.element,

  onDefaultHeaderLeftButtonClick: PropTypes.func,
};

export default withStyles(theme => ({
  container: {
    fontFamily: ['Roboto','Helvetica', 'sans-serif'],
  },
  content: {
    padding: theme.spacing.unit,
  },
  leftButton: {
    color: 'white'
  }
}))(Layout);
