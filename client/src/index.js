import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

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
    <AppLayout>
      <Provider store={store}>
        <Routes history={history} />
      </Provider>
    </AppLayout>
  </BrowserRouter>
);

ReactDOM.render(<AppRoute />, docRoot);

registerServiceWorker();
