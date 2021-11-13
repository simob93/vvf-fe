import { Injectable } from '@angular/core';
import { Servizio, JsonResponse } from '../model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';



interface ServizioResponse {
    success: boolean,
    message: String[],
    data: Observable<Servizio>
}

@Injectable({
    providedIn: 'root'
})
export class ServizioService {

    constructor(private http: HttpClient) { }
    /**
     *
     * @param idVigile
     */
    list(idVigile: number, dal?: any, al?: any) {
        return this.http.get<Servizio[]>('/vvf/servizio/list', {
            params: {
                idVigile: idVigile.toString(),
                dal: dal || '',
                al: al || ''
            }
        });
    }
    /**
     *
     * @param servizio
     */
    update(servizio: Servizio) {
        return this.http.post<Servizio>('/vvf/servizio/update', servizio);
    }
    /**
     *
     * @param servizio
     */
    save(servizio: Servizio) {
        return this.http.post<Servizio>('/vvf/servizio/new', servizio)
    }

    delete(id) {
        return this.http.get<JsonResponse<Servizio>>('/vvf/servizio/delete', {
            params: {
                id
            }
        })
    }
}
