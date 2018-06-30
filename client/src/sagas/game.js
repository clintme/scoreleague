import React from 'react';
import { message } from 'antd';
import { push, go } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import { duckSuccess, duckFailed } from 'ducks';
import * as gameAPI from 'helpers/API/game';

export function* matchGame(params) {
  try {
    const res = yield gameAPI.getMatchGames(params);
    console.log(res)
    if (res.status === 'success') {
      yield put(duckSuccess('GET_GAME_SUCCESS', { ...res.data}));
    } else {
      message.error(res.message);
      yield put(duckFailed('GET_GAME_FAILED', res.message));
    }
  } catch (error) {
    message.error(error.message);
    yield put(duckFailed('GET_GAME_FAILED', error));
  }
}
export function* getMatchGameRequest() {
  while (true) {
    const action = yield take('GET_GAME_REQUEST');

    yield call(matchGame, action.payload);
  }
}
