import React from 'react';
import { message } from 'antd';
import { push, go } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import { duckSuccess, duckFailed } from 'ducks';
import * as scheduleAPI from 'helpers/API/schedule';

export function* matchSchedule(params) {
  try {
    const res = yield scheduleAPI.getMatchSchedules(params);
    console.log(res)
    if (res.status === 'success') {
      yield put(duckSuccess('GET_MATCH_SCHED_SUCCESS', { ...res.data}));
    } else {
      message.error(res.message);
      yield put(duckFailed('GET_MATCH_SCHED_FAILED', res.message));
    }
  } catch (error) {
    message.error(error.message);
    yield put(duckFailed('GET_MATCH_SCHED_FAILED', error));
  }
}
export function* getMatchSchedRequest() {
  while (true) {
    const action = yield take('GET_MATCH_SCHED_REQUEST');

    yield call(matchSchedule, action.payload);
  }
}
