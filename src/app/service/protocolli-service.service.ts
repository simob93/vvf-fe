import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import 'moment/locale/it';

@Injectable({
    providedIn: 'root'
})
export class ProtocolliServiceService {

    constructor(private http: HttpClient) { }
    /**
     * 
     * @param object 
     */
    save(object) {
        return this.http.post<any>('/vvf/protocol/new', object);
    }
    /**
     * 
     * @param object 
     */
    update(object) {
        return this.http.post<any>('/vvf/protocol/update', object);
    }
    /**
     * 
     * @param id 
     */
    delete(id) {
        return this.http.get<any>(`/vvf/protocol/${id}/delete`);
    }

    /**
     * 
     * @param firstResult 
     * @param lastResult 
     */
    listProtocolli(firstResult:any = 0, maxResult: any = 50, objSearch:any = {}) {

        Object.keys(objSearch).forEach(key => {
            if (!objSearch[key] || objSearch[key] == '') {
                delete objSearch[key];
            }
        })
                
        return this.http.get<any>('/vvf/protocol/listpaged', {
            params: {
                firstResult,
                maxResult,
                ...objSearch
            }
        })
    }

}
