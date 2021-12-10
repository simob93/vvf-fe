
import * as VigiliDetailAction from '../actions/vigiliDetailAction';

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
export function detailVigiliReducer(state = initialState, action: VVFAction): AppFetchState {
    switch (action.type) {
        case VigiliDetailAction.FETCHING:
            return {
                ...state,
                data: null,
                isFetching: true,
                message: action.message,
            }
        case VigiliDetailAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload,
                error: false,
            }
        case VigiliDetailAction.FAILED:
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
