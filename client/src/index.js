import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

import './index.css';
import Routes from 'routes';
import configureStore from 'store';
import AppLayout from 'components/App';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore().store;
const history = configureStore().history;

// instantiate component
const docRoot = document.getElementById('root');
const AppRoute = () => (
  <BrowserRouter>
  <Provider store={store}>
    <ConnectedRouter history={history} store={store}>
      <AppLayout history={history}>
        <Routes />
      </AppLayout>
    </ConnectedRouter>
  </Provider>
  </BrowserRouter>
);

ReactDOM.render(<AppRoute />, docRoot);

registerServiceWorker();
