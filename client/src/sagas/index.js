import { fork } from 'redux-saga/effects';

import * as authSaga from './auth';

export default function* rootSaga() {
  yield fork(authSaga.loginRequest);
  // yield fork(authSaga.redirectAfterLoggedIn);
  // yield fork(authSaga.logoutRequest);
  // yield fork(authSaga.notifyAfterLogout);
}
