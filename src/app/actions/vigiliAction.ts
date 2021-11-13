import { Action } from '@ngrx/store';

export const SUCCESS =  '[Vigili list] Success';
export const FETCHING =     '[Vigili list] Load';
export const FAILED =   '[Vigili list] Failed';

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
  private start = 0;
  private limit = 0;

  constructor(start: number, limit: number, searchText: string) {
	this.start = start;
	this.limit = limit;
  }

}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = FetchingAction
  | FailedAction
  | SuccessAction;