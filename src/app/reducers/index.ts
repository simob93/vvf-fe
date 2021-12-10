import { listVigiliReducer } from './listVigiliReducer'
import { detailVigiliReducer } from './detailVigileReducer';
import { listServiziReducer } from './listServiziReducers';


import { AppFetchState } from '../state';
import { ActionReducerMap, createSelector } from '@ngrx/store'
import { listVgilePatentiReducer } from './listVgilePatentiReducer';
import { portletVigilePatentiReducer } from './portletVigilePatentiReducer';
import { listVgileCertificazioniReducer } from './listVigileCertificazioniReducer';
import { portletVigileCertificazioniReducer } from './portletVigileCertificazioniReducer';
import { listScadenzeReducer } from './listScadenzeReducer';
import { portletVigileScadenzeReducer } from './portletVigileScadenzeReducer';
import { listGradiReducer } from './list-gradi.reducer';
import { loginReducer } from './loginReducer';
import { permissionReducer } from './permissionReducer';
import { changePasswordReducer } from './changePasswordReducer';
import { LoginResponse } from '../model/loginResponse';

export interface AppState {
    listVigiliReducer: AppFetchState,
    detailVigiliReducer: AppFetchState,
    listServiziReducer: AppFetchState,
    listVgilePatentiReducer: AppFetchState,
    portletVigilePatentiReducer: AppFetchState,
    listVgileCertificazioniReducer: AppFetchState,
    portletVigileCertificazioniReducer: AppFetchState,
    listScadenzeReducer: AppFetchState,
    portletVigileScadenzeReducer: AppFetchState,
    loginReducer: AppFetchState,
    changePasswordReducer: AppFetchState,
    permissionReducer,
    listGradiReducer,


}

export const loginState = (state: AppState) => state.loginReducer;
export const permissionState = (state: AppState) => state.permissionReducer;

export const getPermessi = createSelector(
    permissionState,
    (state) => {
        let permessi = null;
        if (state && state.permessi) {
            permessi = state.permessi;
        } else if (localStorage.getItem('isLogged') == 'true') {
            permessi = (JSON.parse(localStorage.getItem('userLogged')) as LoginResponse).permessi;
        }
        return permessi;
    }
)


export const getLoginData = createSelector(
    loginState,
    (state: AppFetchState) => {
        let data = null;
        if (state) {
            if(state.data) {
                data = state.data;
            } else if (localStorage.getItem('isLogged') == 'true') {
                data = JSON.parse(localStorage.getItem('userLogged')) as LoginResponse
            }
        }
        return data;
    }
);


export const reducers: ActionReducerMap<AppState> = {
    listVigiliReducer,
    detailVigiliReducer,
    listServiziReducer,
    listVgilePatentiReducer,
    portletVigilePatentiReducer,
    listVgileCertificazioniReducer,
    portletVigileCertificazioniReducer,
    listScadenzeReducer,
    portletVigileScadenzeReducer,
    listGradiReducer,
    changePasswordReducer,
    loginReducer,
    permissionReducer
}

