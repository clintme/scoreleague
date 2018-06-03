import { fork } from 'redux-saga/effects';

import * as authSaga from 'sagas/auth';
import * as teamSaga from 'sagas/team';

export default function* rootSaga() {
  yield fork(authSaga.loginRequest);
  yield fork(teamSaga.createTeamRequest);
  yield fork(teamSaga.getTeamRequest);
}
