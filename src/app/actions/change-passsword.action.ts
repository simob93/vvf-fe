import { Action } from '@ngrx/store';
import { ChangePassword } from '../model/change-password';

export const SUCCESS =  '[Change password] Success';
export const FETCHING = '[Change password] Load';
export const FAILED =   '[Change password] Failed';

export class SuccessAction implements Action {
  readonly type = SUCCESS;
  constructor(public payload: any) {}

}

export class FailedAction implements Action {
  readonly type = FAILED;
  constructor(public payload: any) {}

}

export class FetchingAction implements Action {
  readonly type = FETCHING;
  constructor(public params: ChangePassword) {}
}

export type Actions
  = FetchingAction
  | FailedAction
  | SuccessAction;