import { Action } from '@ngrx/store';

export const SUCCESS =  '[Gradi] Success';
export const FETCHING = '[Gradi] Load';
export const FAILED =   '[Gradi] Failed';

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
  constructor(public idServizio: number) {}
}

export type Actions
  = FetchingAction
  | FailedAction
  | SuccessAction;