import { fork } from 'redux-saga/effects';

import * as authSaga from 'sagas/auth';
import * as teamSaga from 'sagas/team';
import * as playerSaga from 'sagas/player';
import * as scheduleSaga from 'sagas/schedule';
import * as gameSaga from 'sagas/game';

export default function* rootSaga() {
  yield fork(authSaga.loginRequest);
  yield fork(teamSaga.createTeamRequest);
  yield fork(teamSaga.createTeamSuccess);
  yield fork(teamSaga.updateTeamRequest);
  yield fork(teamSaga.updateTeamSuccess);
  yield fork(teamSaga.getTeamRequest);
  yield fork(teamSaga.getTeamInfoRequest);
  yield fork(playerSaga.addPlayerRequest);
  yield fork(playerSaga.getPlayerRequest);
  yield fork(scheduleSaga.getMatchSchedRequest);
  yield fork(gameSaga.getMatchGameRequest);
}
