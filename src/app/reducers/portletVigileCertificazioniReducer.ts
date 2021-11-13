
import * as PortletVigileCertificazioniAction from '../actions/portletVigileCertificazioniAction'
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
export function portletVigileCertificazioniReducer(state = initialState, action: VVFAction): AppFetchState { 
    switch (action.type) {
        case PortletVigileCertificazioniAction.FETCHING:
            return {
                ...state,
                isFetching: true,
                message: action.message,
            } 
        case PortletVigileCertificazioniAction.SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload['data'],
                error: false,
            } 
        case PortletVigileCertificazioniAction.FAILED:
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