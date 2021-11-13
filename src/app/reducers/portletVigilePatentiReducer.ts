
import * as PortletVigilePatentiAction from '../actions/portletVigilePatentiAction';

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
export function portletVigilePatentiReducer(state = initialState, action: VVFAction): AppFetchState { 
    switch (action.type) {
        case PortletVigilePatentiAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                message: action.message,
            } 
        case PortletVigilePatentiAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload['data'],
                error: false,
            } 
        case PortletVigilePatentiAction.FAILED:
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