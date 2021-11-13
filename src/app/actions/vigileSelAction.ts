import { Action } from '@ngrx/store';

export const SELECT =  '[Vigile] select';

export class Selection implements Action {
    readonly type = SELECT;
    constructor(public payload : any) {

    }

}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = Selection