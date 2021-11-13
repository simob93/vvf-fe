import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ruoli } from '../model/ruoli';
import { JsonResponse } from '../model';
import { KeyValue } from '../model/keyValue';
import { RuoliPermessi } from '../model/ruoliPermessi';

@Injectable({
    providedIn: 'root'
})
export class RuoliService {
        
    constructor(
        private http: HttpClient) { }

    get(id) {
        return this.http.get<JsonResponse<Ruoli>>('/vvf/ruoli/get', {
            params: {
                id
            }
        });
    }
    
    /**
     * 
     * @param idPermesso 
     * @param nuovoPermesso 
     */
    changePermesso(idPermesso, permesso) {
        return this.http.get<JsonResponse<String>>('/vvf/ruoli/permessi/change', {
            params: {
                idPermesso, permesso
            }
        })
    }
    /**
     * 
     */
    list() {
        return this.http.get<JsonResponse<Ruoli[]>>('/vvf/ruoli/list');
    }
    /**
     * 
     * @param idRuolo 
     */
    listPermessiCbox(idRuolo) {
        return this.http.get<JsonResponse<KeyValue[]>>('/vvf/ruoli/permessi/cbox', {
            params: {idRuolo}

        });
    }
    /**
     * 
     */
    listCbox() {
        return this.http.get<JsonResponse<KeyValue[]>>('/vvf/ruoli/cbox');
    }
    /**
     * 
     * @param ruolo 
     */
    save(ruolo) {
        return this.http.post<JsonResponse<Ruoli>>('/vvf/ruoli/new', ruolo);
    }
    /**
     * 
     * @param ruolo 
     */
    update(ruolo) {
        return this.http.post<JsonResponse<Ruoli>>('/vvf/ruoli/update', ruolo);
    }
    /**
     * 
     * @param id 
     */
    delete(id) {
        return this.http.get<JsonResponse<Ruoli>>('/vvf/ruoli/delete', {params: {id}});   
    }
}
