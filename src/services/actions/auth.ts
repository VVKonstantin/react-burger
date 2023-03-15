import { requestRegister, requestLogin, requestLogout, requestProfile, requestUpdateProfile } from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { refreshTokenRequest } from "../../utils/api";

import { AppDispatch } from "../types";
import { TFormFields, TUser } from "../types/data";

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

interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  user: TUser;
}

interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  user: TUser;
}

interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

interface IProfileRequestAction {
  readonly type: typeof PROFILE_REQUEST;
}

interface IProfileSuccessAction {
  readonly type: typeof PROFILE_SUCCESS;
  user: TUser;
}

interface IProfileFailedAction {
  readonly type: typeof PROFILE_FAILED;
}

interface IProfileUpdateRequestAction {
  readonly type: typeof PROFILE_UPDATE_REQUEST;
}

interface IProfileUpdateSuccessAction {
  readonly type: typeof PROFILE_UPDATE_SUCCESS;
  user: TUser;
}

interface IProfileUpdateFailedAction {
  readonly type: typeof PROFILE_UPDATE_FAILED;
}

interface ILogoutAction {
  readonly type: typeof LOGOUT;
}

export type TAuthActions = IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | IProfileRequestAction
  | IProfileSuccessAction
  | IProfileFailedAction
  | IProfileUpdateRequestAction
  | IProfileUpdateSuccessAction
  | IProfileUpdateFailedAction
  | ILogoutAction;

export function registerUser(form: TFormFields) {
  return function (dispatch: AppDispatch) {
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

export function loginUser(form: TFormFields) {
  return function (dispatch: AppDispatch) {
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
  return function (dispatch: AppDispatch) {
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

export function updateProfileUser (form: TFormFields) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: PROFILE_UPDATE_REQUEST });
    requestUpdateProfile(form)
      .then((res) => {
        dispatch({
          type: PROFILE_UPDATE_SUCCESS,
          user: res.user
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired" || "jwt malformed") {
          dispatch(refreshUserToken())
            .then(() => {
              requestUpdateProfile(form)
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
  return function (dispatch: AppDispatch) {
    return requestProfile()
      .then((res) => {
        dispatch({ type: PROFILE_SUCCESS, user: res.user });
      })
      .catch((err) => {
        if (err.message === "jwt expired" || "jwt malformed") {
          dispatch(refreshUserToken());
        }
      });
  };
}

export function refreshUserToken() {
  return function (dispatch: AppDispatch) {
    return refreshTokenRequest()
      .then((res) => {
        setCookie("accessToken", res.accessToken.split('Bearer ')[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch(getProfileUser());
      });
  };
}
