
import * as VigiliAction from '../actions/vigiliAction';

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
export function listVigiliReducer(state = initialState, action: VVFAction): AppFetchState { 
    switch (action.type) {
        case VigiliAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                message: action.message,
            } 
        case VigiliAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload['data'],
                total: action.payload['total'],
                error: false,
            } 
        case VigiliAction.FAILED:
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