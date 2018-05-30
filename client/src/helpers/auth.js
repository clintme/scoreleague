import jwtDecode from 'jwt-decode';
import { toastr } from 'react-redux-toastr';

const LOGIN_KEY = process.env.REACT_APP_PROJECT_ID;

function isTokenValid(token) {
  try {
    const tokenData = jwtDecode(token);
    const dateNow = Date.now() / 1000;

    if (parseInt(dateNow, 10) <= tokenData.exp) {
      return true;
    }

    toastr.danger('Auth Error!', 'Expired token');
    return false;
  } catch (e) {
    return false;
  }
}


export function getJWTTokenFromLocalStorage() {
  const authData = localStorage.getItem(LOGIN_KEY);
  if (authData) {
    const authObject = JSON.parse(authData);
    return isTokenValid(authObject.token);
  }
  return false;
}

export function getJWTToken() {
  return localStorage.getItem(LOGIN_KEY);
}

export function setJWTToken(token) {
  localStorage.setItem(LOGIN_KEY, token);
}

export function delJWTToken() {
  localStorage.removeItem(LOGIN_KEY);
}
