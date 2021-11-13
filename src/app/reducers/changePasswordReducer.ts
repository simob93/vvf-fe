
import * as ChangePasswordAction from '../actions/change-passsword.action';

import { 
    VVFAction, AppFetchState } 
from '../state';

/**
 * 
 */
const initialState = {
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
export function changePasswordReducer(state = initialState, action: VVFAction) :AppFetchState { 
    switch (action.type) {
        case ChangePasswordAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                message: action.message,
            } 
        case ChangePasswordAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload['data'],
                msg: action.payload['message'],
                success: action.payload['success'],
                error: false,
            } 
        case ChangePasswordAction.FAILED:
            return {
                ...state,
                isFetching: false,
                data: null,
                success: false,
                error: true,
                errorMsg: action.message,
            } 
      default:
        return state;
    }
}