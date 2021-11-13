
import * as PermissionAction from '../actions/permission.action';

import { 
    VVFAction } 
from '../state';

/**
 * 
 */
const initialState = {
    permessi: null
}
/**
 * 
 * @param state 
 * @param action 
 */
export function permissionReducer(state = initialState, action: VVFAction) { 
    switch (action.type) {
        case PermissionAction.FETCH_PERMESSI:
            return {
                ...state,
                permessi: action.payload
            } 
      default:
        return state;
    }
}