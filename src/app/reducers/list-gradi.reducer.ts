
import * as GradiAction from '../actions/gradi.action';
import * as ScadenzeAction from '../actions/ScadenzeAction';

import { 
    AppFetchState, 
    VVFAction } 
from '../state';

/**
 * 
 */
const initialState: AppFetchState = {
    isFetching: false,
    success: null,
    data: null,
    message: [],
    error: false,
    errorMsg: []
}
/**
 * 
 * @param state 
 * @param action 
 */
export function listGradiReducer(state = initialState, action: VVFAction): AppFetchState { 
    switch (action.type) {
        case GradiAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                message: action.message,
            } 
        case GradiAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload,
                error: false,
            } 
        case GradiAction.FAILED:
            return {
                ...state,
                isFetching: false,
                data: null,
                error: true,
                errorMsg: action.message,
            } 
      default:
        return state;
    }
}