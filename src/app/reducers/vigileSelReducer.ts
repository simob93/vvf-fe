
import * as VigiliSelAction from '../actions/vigileSelAction';

import { 
    VVFAction } 
from '../state';

/**
 * 
 */
const initialState = {
    vigile: null
}
/**
 * 
 * @param state 
 * @param action 
 */
export function vigileSelReducer(state = initialState, action: VVFAction) { 
    switch (action.type) {
        case VigiliSelAction.SELECT:
            return {
                ...state,
                vigile: action.payload
            } 
      default:
        return state;
    }
}