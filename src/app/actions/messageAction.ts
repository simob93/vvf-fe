import { Action } from '@ngrx/store';

export const SHOW =  '[Message show] Show';
export class ShowAction implements Action {
  readonly type = SHOW;
  constructor(public payload: any) {}
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = ShowAction;