import {configureStore} from '@reduxjs/toolkit';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';

import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureAppStore(preloadedState = {}) {
  const store = configureStore({
    reducer: createRootReducer(history), // root reducer with router state
    middleware: [thunk, routerMiddleware(history)],
    preloadedState,
  });

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
}
