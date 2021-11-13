import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Turno } from '../model/turno';
import { JsonResponse } from '../model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TurniService {
    delete() {
        return this.http.get<JsonResponse<Turno[]>>('/vvf/turni/delete', {})
    }
    /**
     * 
     * @param http 
     */
    constructor(private http: HttpClient) {

    }
    /**
     * 
     * @param params 
     */
    calc(params) {
        return this.http.get<JsonResponse<Turno[]>>('/vvf/turni/calc', {
            params
        })
    }
    /**
     * 
     * @param params 
     */
    list(params){
        return this.http.get<JsonResponse<Turno[]>>('/vvf/turni/list', {
            params
        })
    }
    /**
     * 
     * @param dal 
     * @param al 
     */
    print(dal, al) {
        return this.http.post<Blob>(`/vvf/turni/report?dal=${dal}&al=${al}`, null, {observe: 'response', responseType: 'blob' as 'json'}).subscribe((res) => {
            let blob = new Blob([res.body], { type: 'application/pdf' });
            let fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
        });
    }
}
