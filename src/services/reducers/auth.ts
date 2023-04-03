import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_SUCCESS,
  PROFILE_REQUEST
} from '../actions/auth';

import { TAuthActions } from '../actions/auth';
import { TUser } from '../types/data';

type TAuthState = {
  user: TUser | null;
  authRequest: boolean;
  authFailed: boolean;
  isAuthenticated: boolean;
};

const initialState: TAuthState = {
  user: null,
  authRequest: false,
  authFailed: false,
  isAuthenticated: false
};

export const authReducer = (state = initialState, action: TAuthActions) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        authFailed: false,
        authRequest: false,
        user: action.user,
        isAuthenticated: true
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        authFailed: true
      }
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        authRequest: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        authFailed: false,
        authRequest: false,
        user: action.user,
        isAuthenticated: true
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true
      }
    }
    case PROFILE_REQUEST: {
      return {
        ...state,
        authRequest: true
      }
    }
    case PROFILE_UPDATE_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        user: action.user
      }
    }
    case PROFILE_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        user: action.user
      }
    }
    case LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
