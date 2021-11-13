import { Action } from '@ngrx/store';

export const FETCH_PERMESSI =  '[Permessi] fetch';

export class FetchPermessiAction implements Action {
  readonly type = FETCH_PERMESSI;
  constructor(public payload: any) {}

}

export type Actions
  = FetchPermessiAction;