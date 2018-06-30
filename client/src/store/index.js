import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'

// import createHistory from 'history/createBrowserHistory';
import Saga from 'sagas';
import history from 'store/history';
import reducer from 'reducers';

export default function configureStore(preloadedState) {
  // create middlewares
  // const history = createHistory();
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(
    logger,routerMiddleware(history),
    sagaMiddleware
  );

  // create store
  const store = createStore(connectRouter(history)(reducer), compose(middleware));

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
