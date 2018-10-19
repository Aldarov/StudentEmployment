import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import deepOrange from '@material-ui/core/colors/deepOrange';

import Header from './Header';
import { BusyIndicator } from '../busyIndicator';
import { Sidebar } from '../sidebar';
import IconBtn from '../../components/IconBtn';
import Title from '../../components/Title';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: deepOrange,
  },
  typography: {
    useNextVariants: true,
  },
});

const Layout = ({
  classes, children, appTitle,
  headerVisiable, headerLeftPart, headerCenterPart, headerRightPart,
  onDefaultHeaderLeftButtonClick
}) => {
  return (
    <div className={classes.container}>
      <MuiThemeProvider theme={theme} >
        <CssBaseline/>
        <BusyIndicator/>
        <Header
          visiable={headerVisiable}
          leftPart={headerLeftPart || <IconBtn iconName='Menu' onClick={onDefaultHeaderLeftButtonClick} />}
          centerPart={headerCenterPart || <Title title={appTitle} />}
          rightPart={headerRightPart}
        />
        <Sidebar/>
        <div className={classes.content} >
          {children}
        </div>
      </MuiThemeProvider>
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
}))(Layout);
