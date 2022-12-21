import { API_URL } from './constants.js';

export function getData() {
  return request(`${API_URL}ingredients`, {
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    }
  });
}

export function setOrder(data) {
  return request(`${API_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "ingredients": data
    })
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
