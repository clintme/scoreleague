import React from 'react';
import { message } from 'antd';
import { Seq } from 'immutable';
import { push, go } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import { duckSuccess, duckFailed } from 'ducks';
import * as teamAPI from 'helpers/API/team';

export function* createTeam(params) {
  try {
    const res = yield teamAPI.registration(params);
    
    if (res.status === 'success') {
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
export function* createTeamSuccess() {
  while (true) {
    const action = yield take('TREG_SUCCESS');
    
    // yield put(push(`/team/${action.payload.data.id}/players`));
    // yield put(go(0));

    message.success('Team is successfully registered.');
  }
}

export function* updateTeam(params) {
  try {
    const res = yield teamAPI.update(params);
    const { data: { team } } = res;
    if (res.status === 'success') {
      yield put(duckSuccess('TEAM_UPDATE_SUCCESS', { ...team }));
      yield call(message.success('Team is successfully updated.'));
    } else {
      message.error(res.message);
      yield put(duckFailed('TEAM_UPDATE_FAILED', res.message));
    }
  } catch (error) {
    message.error(error.message);
    yield put(duckFailed('TEAM_UPDATE_FAILED', error));
  }
}
export function* updateTeamRequest() {
  while (true) {
    const action = yield take('TEAM_UPDATE_REQUEST');
    
    yield call(updateTeam, action.payload);
  }
}
export function* updateTeamSuccess() {
  while (true) {
    yield take('TEAM_UPDATE_SUCCESS');
    
    yield put(push('/team'));
    yield put(go(0));
  }
}

export function* getTeam(params) {
  try {
    const res = yield teamAPI.registeredTeam(params || { ID: 0 });
    if (res.status === 'success') {
      yield put(duckSuccess('GET_TEAM_SUCCESS', res));
    } else {
      message.error(res.message);
      yield put(duckFailed('GET_TEAM_FAILED', res.message));
    }
  } catch (error) {
    message.error(error.message);
    yield put(duckFailed('GET_TEAM_FAILED', error));
  }
}

export function* getTeamRequest() {
  while (true) {
    const action = yield take('GET_TEAM_REQUEST');

    yield call(getTeam, action.payload);
  }
}

export function* getTeamInfo(params) {
  try {
    const res = yield teamAPI.registeredTeam(params);
    if (res.status === 'success') {
      yield put(duckSuccess('TEAM_INFO_SUCCESS', res.data.teams[0]));
    } else {
      message.error(res.message);
      yield put(duckFailed('TEAM_INFO_FAILED', res.message));
    }
  } catch (error) {
    message.error(error.message);
    yield put(duckFailed('TEAM_INFO_FAILED', error));
  }
}

export function* getTeamInfoRequest() {
  while (true) {
    const action = yield take('TEAM_INFO_REQUEST');

    yield call(getTeamInfo, action.payload);
  }
}
