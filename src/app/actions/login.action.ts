import { Action } from '@ngrx/store';
import { LoginResponse } from '../model/loginResponse';

export const SUCCESS =  '[Login] Success';
export const FAILED =  '[Login] Failed';
export const FETCHING = '[Login] Load';
export const LOG_OUT =  '[Login] LogOut';
export const DO_LOG_OUT =  '[Login] Do LogOUT';


export class SuccessAction implements Action {
  readonly type = SUCCESS;
  constructor(public payload: any) {}
}

export class LogOutAction implements Action {
  readonly type = LOG_OUT;
  constructor() {}
}

export class DoLogOutAction implements Action {
  readonly type = DO_LOG_OUT;
  constructor() {}
}

export class FetchingAction implements Action {
  readonly type = FETCHING;
  constructor(public payload: LoginResponse) {}
}

export class FailedAction implements Action {
  readonly type = FAILED;
  constructor(public payload: LoginResponse) {}
}

export type Actions
  = FetchingAction
  | SuccessAction | FailedAction;