import { API_URL } from './constants.js';

export function getData() {
  const res = fetch(API_URL, {
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    }
  });
  return res.then(isOk);
}

function isOk(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
