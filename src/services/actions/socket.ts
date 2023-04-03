import { TOrders } from "../types/data";

export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_START_AUTH_USER = "WS_CONNECTION_START_AUTH_USER"
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_GET_MESSAGE_AUTH = 'WS_GET_MESSAGE_AUTH';

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionStartAuthAction {
  readonly type: typeof WS_CONNECTION_START_AUTH_USER;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TOrders;
}

export interface IWSGetMessageAuthAction {
  readonly type: typeof WS_GET_MESSAGE_AUTH;
  payload: TOrders;
}

export type TWSConnectionActions = IWSConnectionStartAction
  | IWSConnectionStartAuthAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSGetMessageAuthAction;
