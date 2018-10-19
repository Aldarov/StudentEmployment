import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import appInit from './_global/appInit';
import { Navigation } from './_global/modules/navigation';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React, {
    exclude: [
      /^Route/,
      /^Switch/,
      /^CssBaseline/
    ]
  });
}

appInit(store);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component/>
    </Provider>,
    document.getElementById('root'),
  );
};

render(Navigation);

if (module.hot) {
  module.hot.accept('./_global/modules/navigation', () => {
    render(Navigation);
  });
}
