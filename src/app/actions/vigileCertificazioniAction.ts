import { Action } from '@ngrx/store';

export const SUCCESS =          '[Vigile certificazioni] Success';
export const FETCHING =         '[Vigile certificazioni] Load';
export const FAILED =           '[Vigile certificazioni] Failed';

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
  constructor(public idVigile: number) {}

}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = FetchingAction
  | FailedAction
  | SuccessAction;