import { requestRegister, requestLogin, requestLogout, requestProfile, requestUpdateProfile } from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/cookie";

import { refreshTokenRequest } from "../../utils/api";

import { getCookie } from "../../utils/cookie";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT = 'LOGOUT';

export const PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAILED = 'PROFILE_UPDATE_FAILED';

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILED = 'PROFILE_FAILED';

export function registerUser(form) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    requestRegister(form)
      .then(res => {
        if (res.success) {
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
          dispatch({
            type: REGISTER_SUCCESS,
            user: res.user
          });
        }
      })
      .catch(e => {
        dispatch({
          type: REGISTER_FAILED
        });
      });
  }
}

export function loginUser(form) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    requestLogin(form)
      .then(res => {
        if (res.success) {
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user
          });
        }
      })
      .catch(e => {
        console.log(e);
        dispatch({
          type: LOGIN_FAILED
        });
      });
  }
}

export function logoutUser() {
  return function (dispatch) {
    requestLogout()
      .then(res => {
        if (res.success) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch({
            type: LOGOUT,
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
}

export function updateProfileUser(form) {
  return function (dispatch) {
    dispatch({ type: PROFILE_UPDATE_REQUEST });
    requestUpdateProfile(form, getCookie("accessToken"))
      .then((res) => {
        dispatch({
          type: PROFILE_UPDATE_SUCCESS,
          user: res.user
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired" || "jwt malformed") {
          dispatch(refreshUserToken(getCookie("refreshToken"))).then(() => {
            requestUpdateProfile(form, getCookie("accessToken"))
              .then((res) => {
                dispatch({
                  type: PROFILE_UPDATE_SUCCESS,
                  user: res.user
                });
              })
              .catch(() => {
                dispatch({ type: PROFILE_UPDATE_FAILED });
              });
          });
        }
      });
  };
}

export function getProfileUser() {
  return function (dispatch) {
    return requestProfile(getCookie("accessToken"))
      .then((res) => {
        dispatch({ type: PROFILE_SUCCESS, user: res.user });
      })
      .catch((err) => {
        if (err.message === "jwt expired" || "jwt malformed") {
          dispatch(refreshUserToken(getCookie("refreshToken")));
        }
      });
  };
}

export function refreshUserToken(token) {
  return function (dispatch) {
    return refreshTokenRequest(token)
      .then((res) => {
        setCookie("accessToken", res.accessToken.split('Bearer ')[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch(getProfileUser(getCookie("accessToken")));
      });
  };
}
