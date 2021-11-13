import { Action } from '@ngrx/store';

export const LOAD =  '[Load portlet] load';
export class loadAction implements Action {
  readonly type = LOAD;
  constructor(public idVigile: number) {}
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = loadAction;