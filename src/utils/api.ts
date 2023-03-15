import { IAuthResponse, TFormFields, IIngredientsResponse, ILoginResponse, IPostOrderResponse, IResponse, ITokenResponse, IUserResponse, TRequestOptions } from '../services/types/data.js';
import { API_URL } from './constants';
import { getCookie } from './cookie';


function request<T>(url: string, options: TRequestOptions): Promise<T> {
  return fetch(url, options).then(isOk)
}

function isOk<T>(res: IResponse<T>) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(err => Promise.reject(err));
}

export function requestLogin(form: TFormFields) {
  return request<ILoginResponse>(`${API_URL}auth/login`, {
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
  return request<IAuthResponse>(`${API_URL}auth/logout`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  });
}

export function requestRegister(form: TFormFields) {
  return request<ILoginResponse>(`${API_URL}auth/register`, {
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

export function requestForgottenPassword(form: TFormFields) {
  return request<IAuthResponse>(`${API_URL}password-reset`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: form.email
    })
  });
}

export function requestResetForgottenPassword(form: TFormFields) {
  return request<IAuthResponse>(`${API_URL}password-reset/reset`, {
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
  return request<IIngredientsResponse>(`${API_URL}ingredients`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  });
}

export function postOrder(data: Array<string>) {
  return request<IPostOrderResponse>(`${API_URL}orders`, {
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

export function requestUpdateProfile(form: TFormFields) {
  return request<IUserResponse>(`${API_URL}auth/user`, {
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

export function requestProfile() {
  return request<IUserResponse>(`${API_URL}auth/user`, {
    headers: {
      'Content-type': 'application/json',
      authorization: "Bearer " + getCookie('accessToken')
    }
  });
}

export function refreshTokenRequest() {
  return request<ITokenResponse>(`${API_URL}auth/token`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
}
