import { API_URL } from './constants.js';
import { getCookie } from './cookie.js';

export function requestLogin(form) {
  return request(`${API_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password
    })
  });
}

export function requestLogout() {
  return request(`${API_URL}auth/logout`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  });
}

export function requestRegister(form) {
  return request(`${API_URL}auth/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password
    })
  });
}

export function requestForgottenPassword(form) {
  return request(`${API_URL}password-reset`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: form.email
    })
  });
}

export function requestResetForgottenPassword(form) {
  return request(`${API_URL}password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      password: form.password,
      token: form.code
    })
  });
}

export function getData() {
  return request(`${API_URL}ingredients`, {
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    }
  });
}

export function postOrder(data) {
  return request(`${API_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      authorization: "Bearer " + getCookie('accessToken')
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
  return res.json().then(err => Promise.reject(err));
}

export function requestProfile() {
  return request(`${API_URL}auth/user`, {
    headers: {
      'Content-type': 'application/json',
      authorization: "Bearer " + getCookie('accessToken')
    }
  });
}

export function requestUpdateProfile(form) {
  return request(`${API_URL}auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      authorization: "Bearer " + getCookie('accessToken')
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password
    })
  });
}

export function refreshTokenRequest() {
  return request(`${API_URL}auth/token`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
}
