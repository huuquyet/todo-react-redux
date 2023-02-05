import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import {initAuth} from './auth';
import configureStore, {history} from './store';
import registerServiceWorker from './utils/register-service-worker';
import App from './views/app';
import './views/styles/styles.scss';

const store = configureStore();
const container = document.getElementById('root');
const root = createRoot(container);

function render(Component) {
  root.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Component />
        </>
      </ConnectedRouter>
    </Provider>
  );
}

if (module.hot) {
  module.hot.accept('./views/app', () => {
    render(require('./views/app').default);
  });
}

registerServiceWorker();

initAuth(store.dispatch)
  .then(() => render(App))
  .catch((error) => console.error(error));
