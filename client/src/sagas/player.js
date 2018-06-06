import React from 'react';
import { message } from 'antd';
import { push, go } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import { duckSuccess, duckFailed } from 'ducks';
import * as playerAPI from 'helpers/API/player';

export function* addPlayer(params) {
  try {
    const res = yield playerAPI.addPlayer(params);
    console.log(res)
    if (res.status === 'success') {
      yield put(duckSuccess('PREG_SUCCESS', { ...res.data}));
    } else {
      message.error(res.message);
      yield put(duckFailed('PREG_FAILED', res.message));
    }
  } catch (error) {
    message.error(error.message);
    yield put(duckFailed('PREG_FAILED', error));
  }
}
export function* addPlayerRequest() {
  while (true) {
    const action = yield take('PREG_REQUEST');

    yield call(addPlayer, action.payload);
  }
}
export function* getPlayers(params) {
  try {
    const res = yield playerAPI.registeredPlayers(params);

    if (res.status === 'success') {
      yield put(duckSuccess('GET_PLAYERS_SUCCESS', res.data));
    } else {
      message.error(res.message);
      yield put(duckFailed('GET_PLAYERS_FAILED', res.message));
    }
  } catch (error) {
    message.error(error.message);
    yield put(duckFailed('GET_PLAYERS_FAILED', error));
  }
}

export function* getPlayerRequest() {
  while (true) {
    const action = yield take('GET_PLAYERS_REQUEST');

    yield call(getPlayers, action.payload);
  }
}
