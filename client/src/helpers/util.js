import 'whatwg-fetch';
import moment from 'moment';
import config from 'constants/config';
import { getJWTTokenFromLocalStorage } from 'helpers/auth';

const queryParams = params => Object.keys(params)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&');

const defaultHeaders = (fbToken) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const token = getJWTTokenFromLocalStorage();
  if (token) {
    headers.Authorization = fbToken;
  }
  return headers;
};

function checkStatus(response) {
  if (response.status >= 200 && response.status <= 401) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function fetchFromAPI({ endpoint, params, fbToken }) {
  let url = [config.apiUrl, endpoint].join('/');
  if (params) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(params);
  }

  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: defaultHeaders(fbToken),
  }).then(checkStatus)
    .then(response => response.json());
}

export function postToAPI({ endpoint, body, fbToken }) {
  const url = [config.apiUrl, endpoint].join('/');
  const headconfig = {
    method: 'POST',
    mode: 'cors',
    headers: defaultHeaders(fbToken),
    body: JSON.stringify(body),
  };

  return fetch(url, headconfig)
    .then(checkStatus)
    .then(response => response.json());
}

export function postUploadAPI({ endpoint, data, fbToken }) {
  const url = [config.apiUploadUrl, endpoint].join('/');
  const headconfig = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      Authorization: fbToken,
    },
    body: data,
  };

  return fetch(url, headconfig)
    .then(checkStatus)
    .then(response => response.json());
}

export function putToAPI({ endpoint, body, fbToken }) {
  const url = [config.apiUrl, endpoint].join('/');

  return fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: defaultHeaders(fbToken),
    body: JSON.stringify(body),
  });
}

export function deleteFromAPI({ endpoint, fbToken }) {
  const url = [config.apiUrl, endpoint].join('/');

  return fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: defaultHeaders(fbToken),
  });
}

export function createConstants(...constants) {
  return constants.reduce((accumulator, constant) => {
    accumulator[constant] = constant; // eslint-disable-line
    return accumulator;
  }, {});
}

export function _bind(strinOrAray, scope) { // eslint-disable-line
  let array = strinOrAray;
  if (!Array.isArray(strinOrAray)) {
    array = strinOrAray.split(' ');
  }

  return array.map(item => scope[item] = scope[item].bind(scope)); // eslint-disable-line
}

export function createWord(arr) {
  return arr.reduce((s, n) => {
    s.push(n);
    return s;
  }, []);
}

export function getGameMatchSets(gameList, id) {
  return gameList.reduce((s, n) => {
    if (n.get('scheduled_id') === id) {
      s.push(n);
    }
    
    return s;
  }, [])
}