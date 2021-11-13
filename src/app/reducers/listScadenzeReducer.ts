
import * as VigiliAction from '../actions/vigiliAction';
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
    errorMsg: [],
    total: 0
}
/**
 * 
 * @param state 
 * @param action 
 */
export function listScadenzeReducer(state = initialState, action: VVFAction): AppFetchState { 
    switch (action.type) {
        case ScadenzeAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                message: action.message,
            } 
        case ScadenzeAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload['data'],
                error: false,
            } 
        case ScadenzeAction.FAILED:
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