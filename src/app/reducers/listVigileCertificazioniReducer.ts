
import * as VigileCertificazioniAction from '../actions/vigileCertificazioniAction';

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
export function listVgileCertificazioniReducer(state = initialState, action: VVFAction): AppFetchState {
    switch (action.type) {
        case VigileCertificazioniAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                message: action.message,
            } 
        case VigileCertificazioniAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload['data'],
                error: false,
            } 
        case VigileCertificazioniAction.FAILED:
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