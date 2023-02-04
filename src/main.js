import React from 'react';
import {createRoot} from 'react-dom/client';
import {AppContainer} from 'react-hot-loader';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import {initAuth} from './core/auth';
import configureStore from './core/store';
import Root from './views/root';
import './views/styles/styles.scss';

const store = configureStore();
const syncedHistory = syncHistoryWithStore(browserHistory, store);
const container = document.getElementById('root');
const root = createRoot(container);

function render(Root) {
  root.render(
    <AppContainer>
      <Root history={syncedHistory} store={store} />
    </AppContainer>
  );
}

if (module.hot) {
  module.hot.accept('./views/root', () => {
    render(require('./views/root').default);
  });
}

initAuth(store.dispatch)
  .then(() => render(Root))
  .catch((error) => console.error(error)); // eslint-disable-line no-console
