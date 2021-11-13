import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponse, Assenza } from '../model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AssenzeService {
    constructor(
        private http: HttpClient
    ) {

    }
    /**
     * 
     * @param idVigile 
     */
    listBy(idVigile) {
        return this.http.get<JsonResponse<Assenza[]>>('/vvf/assenze/listby', {
            params: {
                idVigile
            }
        }).pipe(map(resp => resp.data));
    }   
    /** */
    save(assenza:Assenza) {
        return this.http.post<JsonResponse<Assenza>>('/vvf/assenze/new', assenza).pipe(map(resp => resp.data));
    }
    /**
     * 
     * @param assenza 
     */
    update(assenza:Assenza) {
        return this.http.post<JsonResponse<Assenza>>('/vvf/assenze/update', assenza).pipe(map(resp => resp.data));
    }
    /**
     * 
     * @param id 
     */
    delete(id) {
        return this.http.get<JsonResponse<Assenza[]>>('/vvf/assenze/delete', {
            params: {
                id
            }
        }).pipe(map(resp => resp.data));
    }
    /**
     * 
     * @param params 
     */
    getLastActive(params)  {
        return this.http.get<JsonResponse<Assenza>>('/vvf/assenze/getlast', {
            params
        })
    }

}