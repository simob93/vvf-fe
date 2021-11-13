
import * as VigilePatentiAction from '../actions/vigilePatentiAction';

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
export function listVgilePatentiReducer(state = initialState, action: VVFAction): AppFetchState {
    switch (action.type) {
        case VigilePatentiAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                message: action.message,
            } 
        case VigilePatentiAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload['data'],
                error: false,
            } 
        case VigilePatentiAction.FAILED:
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