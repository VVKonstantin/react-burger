import { API_URL } from './constants.js';

export function getData() {
  return request(API_URL, {
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    }
  });
}

function request(url, options) {
  return fetch(url, options).then(isOk)
}

function isOk(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
