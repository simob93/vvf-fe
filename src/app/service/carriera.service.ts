import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponse, Carriera } from '../model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CarrieraService {
    constructor(
        private http: HttpClient
    ) {

    }
    /**
     *
     * @param idVigile
     */
    listBy(idVigile, dal?: any, al?: any) {
        return this.http.get<JsonResponse<Carriera[]>>('/vvf/carriera/listby', {
            params: {
                idVigile,
                dal: dal || '',
                al: al || ''
            }
        }).pipe(map(resp => resp.data));
    }
    /** */
    save(carriera: Carriera) {
        return this.http.post<JsonResponse<Carriera>>('/vvf/carriera/new', carriera).pipe(map(resp => resp.data));
    }
    /**
     *
     * @param Carriera
     */
    update(Carriera:Carriera) {
        return this.http.post<JsonResponse<Carriera>>('/vvf/carriera/update', Carriera).pipe(map(resp => resp.data));
    }
    /**
     *
     * @param id
     */
    delete(id) {
        return this.http.get<JsonResponse<Carriera[]>>('/vvf/carriera/delete', {
            params: {
                id
            }
        }).pipe(map(resp => resp.data));
    }

}
