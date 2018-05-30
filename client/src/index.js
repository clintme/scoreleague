import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import Routes from './routes';
import configureStore from './store';
// import Saga from './sagas';
// import reducer from './reducers';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore().store;
const history = configureStore().history;

// instantiate component
const docRoot = document.getElementById('root');
const AppRoute = () => (
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
);

ReactDOM.render(<AppRoute />, docRoot);

registerServiceWorker();
