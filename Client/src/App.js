import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import deepOrange from '@material-ui/core/colors/deepOrange';

import store from './store';
import appInit from './_global/appInit';
import { Navigation } from './_global/modules/navigation';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React, {
    exclude: [
      // /^Route/,
      // /^Switch/,
      // /^CssBaseline/
    ]
  });
}

appInit(store);

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: deepOrange,
  },
  typography: {
    useNextVariants: true,
  },
});

const render = Component => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme} >
      <CssBaseline/>
      <Provider store={store}>
        <Component/>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
  );
};

render(Navigation);

if (module.hot) {
  module.hot.accept('./_global/modules/navigation', () => {
    render(Navigation);
  });
}
