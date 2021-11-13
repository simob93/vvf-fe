
import * as LoginAction from '../actions/login.action';

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
    isLogged: false,
    message: [],
    error: false,
    errorMsg: []
}
/**
 * 
 * @param state 
 * @param action 
 */
export function loginReducer(state = initialState, action: VVFAction) : any { 
    switch (action.type) {
        case LoginAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                isLogged: false,
                message: action.message,
            } 
        case LoginAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLogged: true,
                data: action.payload['data'],
                success: true,
                error: false,
            }
        case LoginAction.FAILED:
            return {
                ...state,
                isFetching: false,
                isLogged: false,
                data: action.payload['data'],
                success: false,
                error: true,
                errorMsg: action.payload['message']
            } 
        case LoginAction.DO_LOG_OUT:
            return {
                ...state,
                isFetching: true,
                success: true,
                isLogged: true,
                data: null,
                error: true,
                errorMsg: action.message,
            } 
        case LoginAction.LOG_OUT:
            return {
                ...state,
                isFetching: false,
                success: true,
                isLogged: false,
                data: null,
                error: false,
                errorMsg: []
            } 
      default:
        return state;
    }
}