import { fork } from 'redux-saga/effects';

import * as authSaga from 'sagas/auth';
import * as teamSaga from 'sagas/team';
import * as playerSaga from 'sagas/player';

export default function* rootSaga() {
  yield fork(authSaga.loginRequest);
  yield fork(teamSaga.createTeamRequest);
  yield fork(teamSaga.createTeamSuccess);
  yield fork(teamSaga.getTeamRequest);
  yield fork(teamSaga.getTeamInfoRequest);
  yield fork(playerSaga.getPlayerRequest);
}
