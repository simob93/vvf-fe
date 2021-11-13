
import * as PortletVigileScadenzeAction from '../actions/portletVigileScadenzeAction';

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
export function portletVigileScadenzeReducer(state = initialState, action: VVFAction): AppFetchState { 
    switch (action.type) {
        case PortletVigileScadenzeAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                message: action.message,
            } 
        case PortletVigileScadenzeAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload['data'],
                error: false,
            } 
        case PortletVigileScadenzeAction.FAILED:
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