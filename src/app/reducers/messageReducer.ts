
import * as MessageAction from '../actions/messageAction';

import { 
    messageState, 
    VVFAction } 
from '../state';

/**
 * 
 */
const initialState: messageState = {
    success: null,
    message:[]
}
/**
 * 
 * @param state 
 * @param action 
 */
export function messageReducer(state = initialState, action: VVFAction): messageState { 
    switch (action.type) {
        case MessageAction.SHOW:
            return {
                ...state,
                success: action.payload['success'],
                message: action.payload['message']
            } 
      default:
        return state;
    }
}