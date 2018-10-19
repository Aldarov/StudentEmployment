import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools  } from 'redux-devtools-extension';

import reducers from './reducers';

function getMiddleware() {
  const middleware = applyMiddleware(
    thunk,
  );

  if (process.env.NODE_ENV === 'development') {
    return composeWithDevTools({})(middleware);
  }
  return middleware;
}

const store = createStore(reducers, getMiddleware());

export default store;
