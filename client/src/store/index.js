import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';

import Saga from '../sagas';
import reducer from '../reducers';

export default function configureStore(preloadedState) {
  // create middlewares
  const history = createHistory();
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(
    logger,
    routerMiddleware(history),
    sagaMiddleware
  );

  // create store
  const store = createStore(reducer, middleware);

  // run saga middleware
  sagaMiddleware.run(Saga);

  if (module.hot) {
    module.hot
      .accept('../reducers', () => {
        /* eslint-disable global-require */
        const nextRootReducer = require('../reducers/index');
        /* eslint-enable global-require */
        store.replaceReducer(nextRootReducer);
      });
  }
  return {store, history};
}
