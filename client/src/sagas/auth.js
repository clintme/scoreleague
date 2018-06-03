// import { toastr } from 'react-redux-toastr';
import { call, put, take } from 'redux-saga/effects';
// import { push } from 'react-router-redux';

import { duckSuccess, duckFailed } from 'ducks';

import * as userAPI from 'helpers/API/user';

function loginAPI(params) {
  return userAPI.login(params)
}

export function* login(params) {
  try {
    const res = yield call(loginAPI, params);
    const resData = {
      ...res.data,
      ...params,    // redirect_url, locale, email, profile_img,
    };
    console.log(res)

    if (res.data) {
      yield put(duckSuccess('LOGIN_SUCCESS', resData));
    } else {
      // toastr.error('Login Failed!', res.message);
      console.log('Login Failed')
      yield put(duckFailed('LOGIN_FAILED', res.message));
    }
  } catch (err) {
    // toastr.error('API Login Failed!', 'Internal error');
    console.log('API Login Failed')

    yield put(duckFailed('LOGIN_FAILED', err));
  }
}
export function* loginRequest() {
  while (true) {
    const action = yield take('LOGIN_REQUEST');

    yield call(login, action.payload);
  }
}
