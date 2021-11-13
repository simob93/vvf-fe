
import * as ServiziAction from '../actions/serviziAction';

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
export function listServiziReducer(state = initialState, action: VVFAction): AppFetchState { 
    switch (action.type) {
        case ServiziAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                message: action.message,
            } 
        case ServiziAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload['data'],
                error: false,
            } 
        case ServiziAction.FAILED:
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