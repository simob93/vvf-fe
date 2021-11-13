import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '../model';
import { Utente } from '../model/utenti';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export  class UtentiService  {
    constructor(private http: HttpClient) {

    }

    listUtenti() : Observable<JsonResponse<Utente>> {
        return this.http.get<JsonResponse<Utente>>('/vvf/user/list');
    }
    /**
     * abilita l'utente all'utilizzo della piattaforma
     * @param id 
     */
    enable(id) {
        return this.http.get<JsonResponse<Utente>>('/vvf/user/enable', {
            params: {
                id
            }
        });
    }
    /**
     * 
     * @param id 
     */
    resetPassword(id) {
        return this.http.get<JsonResponse<String>>('/vvf/user/resetpassword', {
            params: {
                id
            }
        })
    }
    /**
     * disabilita l'utente all'utilizzo della piattaforma
     * @param id 
     */
    disable(id) {
        return this.http.get<JsonResponse<Utente>>('/vvf/user/disable', {
            params: {
                id
            }
        });
    }
    /**
     * 
     * @param utente 
     */
    save(utente: Utente) {
        return this.http.post<JsonResponse<Utente>>('/vvf/user/new', utente);
    }
    /**
     * 
     * @param utente 
     */
    update(utente: Utente) {
        return this.http.post<JsonResponse<Utente>>('/vvf/user/update', utente);
    }
    /**
     * 
     * @param id 
     */
    get(id) {
        return this.http.get<JsonResponse<Utente>>('/vvf/user/get', {
            params: {
                id
            }
        })
    }
    /**
     * 
     * @param id 
     */
    delete(id) {
        return this.http.get<JsonResponse<Utente>>('/vvf/user/delete', {
            params: {
                id
            }
        });
    }

}