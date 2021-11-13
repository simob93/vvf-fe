import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponse, Grado } from '../model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GradoService {
    constructor(
        private http: HttpClient
    ) {

    }
    /**
     * 
     * @param idVigile 
     */
    listBy(idServizio) {
        return this.http.get<JsonResponse<Grado[]>>('/vvf/gradi/listby', {
            params: {
                idServizio
            }
        }).pipe(map(resp => resp.data));
    }   
    /** */
    save(Grado:Grado) {
        return this.http.post<JsonResponse<Grado>>('/vvf/gradi/new', Grado)
        .pipe(map(resp => resp.data));
    }
    /**
     * 
     * @param Grado 
     */
    update(Grado:Grado) {
        return this.http.post<JsonResponse<Grado>>('/vvf/gradi/update', Grado).pipe(map(resp => resp.data));
    }
    /**
     * 
     * @param id 
     */
    delete(id) {
        return this.http.get<JsonResponse<Grado[]>>('/vvf/gradi/delete', {
            params: {
                id
            }
        }).pipe(map(resp => resp.data));
    }

}