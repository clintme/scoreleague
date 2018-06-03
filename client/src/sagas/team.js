import { message } from 'antd';
import { call, put, take } from 'redux-saga/effects';
import { duckSuccess, duckFailed } from 'ducks';
import * as teamAPI from 'helpers/API/team';

export function* createTeam(params) {
  try {
    const res = yield teamAPI.registration(params);
    
    if (res.status === 'success') {
      message.success(res.message);
      yield put(duckSuccess('TREG_SUCCESS', { ...res.data}));
    } else {
      message.error(res.message);
      yield put(duckFailed('TREG_FAILED', res.message));
    }
  } catch (error) {
    message.error(error.message);
    yield put(duckFailed('TREG_FAILED', error));
  }
}
export function* createTeamRequest() {
  while (true) {
    const action = yield take('TREG_REQUEST');

    yield call(createTeam, action.payload);
  }
}

export function* getTeam(params) {
  try {
    const res = yield teamAPI.registeredTeam(params);
    if (res.status === 'success') {
      yield put(duckSuccess('GET_TEAM_SUCCESS', res));
    } else {
      message.error(res.message);
      yield put(duckFailed('TREG_FAILED', res.message));
    }
  } catch (error) {
    message.error(error.message);
    yield put(duckFailed('TREG_FAILED', error));
  }
}

export function* getTeamRequest() {
  while (true) {
    const action = yield take('GET_TEAM_REQUEST');

    console.log(action)
    yield call(getTeam, action.payload);
  }
}
