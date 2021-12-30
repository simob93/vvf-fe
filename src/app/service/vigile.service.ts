
import { Injectable } from '@angular/core';
import {
    HttpClient, HttpHeaders, HttpParams
} from '@angular/common/http';
import {
    Vigile
} from '../model/vigile';
import { Observable } from 'rxjs';
import { PatentiServizio } from '../model/patentiServizio';
import { Certificati, Dotazione, JsonResponse } from '../model';
import * as moment from 'moment';
import 'moment/locale/it';


@Injectable({
    providedIn: 'root'
})
export class VigileService {
    

    constructor(
        private http: HttpClient, ) { }
    /**
     *
     * @param limit
     * @param start
     * @param srcText
     */
    list(start: number, limit: number,  srcText: string): Observable<Vigile[]> {


        return this.http.get<Vigile[]>('/vvf/vigili/listpaged', {
            params: {
                limit: limit.toString(),
                start: start.toString(),
                srcText: srcText || ''
            }
        });
    }
    /**
     * 
     * @param params 
     */
    listV2(params): Observable<Vigile[]> {
        return this.http.get<Vigile[]>('/vvf/vigili/list', {
            params: params
        });
    }
    /**
     *
     * @param dateFrom
     * @param dateTo
     * @param type
     */
    getInfo() {
        return this.http.get<Vigile[]>('/vvf/vigili/info');
    }

    /**
     *
     * @param id
     * @param dateFrom
     * @param dateTo
     */
    listScadenze(id, dateFrom, dateTo, idArea, storico): Observable<Array<any>> {

        dateFrom = dateFrom || new Date()
        dateTo = dateTo || new Date()

        let obj = {
            from: moment(dateFrom).format('YYYY-MM-DD'),
            to: moment(dateFrom).format('YYYY-MM-DD'),
            storico
        }
        if (idArea) {
            Object.assign(obj, {
                idArea
            });
        }

        return this.http.get<Array<any>>(`/vvf/vigili/${id}/expiry`, {
            params: obj
        });
    }
    /**
     *
     * @param id
     */
    cboxTypeScadenze(id, idArea): Observable<Array<any>> {
        return this.http.get<Array<any>>(`/vvf/vigili/${id}/expiry/person`, {params: {idArea}});
    }
    /**
     *
     * @param id
     */
    listPatenti(id): Observable<PatentiServizio[]> {
        return this.http.get<PatentiServizio[]>(`/vvf/vigili/${id}/licenses`);
    }
    /**
     *
     * @param id
     */
    listCertificati(id): Observable<Certificati[]> {
        return this.http.get<Certificati[]>(`/vvf/vigili/${id}/certified`);
    }
    /**
     *
     * @param id
     */
    get(id: string): Observable<Vigile> {
        return this.http.get<Vigile>('/vvf/vigili/' + id);
    }
    /**
     *
     * @param vigile
     */
    update(vigile: Vigile) {
        return this.http.post<Vigile>('/vvf/vigili/update', vigile);
    }
    /**
     *
     * @param vigile
     */
    save(vigile: Vigile) {
        return this.http.post<Vigile>('/vvf/vigili/new', vigile);
    }
    /**
     *
     * @param id
     */
    delete(id:number) {
        return this.http.get<Vigile>(`/vvf/vigili/${id}/delete`);
    }
    /**
     * 
     * @param idVigile 
     */
    listDotazioniCbox(idVigile): Observable<JsonResponse<Dotazione[]>> {
        return this.http.get<JsonResponse<Dotazione[]>>(`/vvf/vigili/dotazione/cbox`, {
            params: {
                idVigile
            }
        });
    }
    /**
     * 
     * @param idReg 
     * @returns 
     */
    getDotazioneById(idReg): Observable<JsonResponse<Dotazione>> {
        return this.http.get<JsonResponse<Dotazione>>(`/vvf/vigili/dotazione/get`, {
            params: {
                id:idReg
            }
        });
    }
    /**
     * 
     * @param dotazione 
     */
    saveDotazione(dotazione: Dotazione): Observable<JsonResponse<Dotazione>> {
        return this.http.post<JsonResponse<Dotazione>>(`/vvf/vigili/dotazione/save`, dotazione);
    }
    /**
     * 
     * @param dotazione 
     */
    updateDotazione(dotazione: Dotazione): Observable<JsonResponse<Dotazione>> {
        return this.http.post<JsonResponse<Dotazione>>(`/vvf/vigili/dotazione/update`, dotazione);
    }
    /**
     * 
     * @param id 
     */
    deleteDotazione(id): Observable<JsonResponse<Dotazione>> {
        return this.http.get<JsonResponse<Dotazione>>(`/vvf/vigili/dotazione/delete`, {
            params: {
                id
            }
        });
    }

    print(): any {
        return this.http.post<Blob>(`/vvf/vigili/report`, null, {observe: 'response', responseType: 'blob' as 'json'}).subscribe((res) => {
            let blob = new Blob([res.body], { type: 'application/pdf' });
            let fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
        });
    }
    /**
     * 
     * @param id 
     * @param base64 
     * @returns 
     */
    uploadFoto(idVigile, base64) {
        let httpParams = new HttpParams()
            .set("idVigile", idVigile)
            .set("base64", encodeURIComponent(base64)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/gi, '$')
            .replace(/%2C/gi, ',')
            .replace(/%3B/gi, ';')
            //.replace(/%2B/gi, '+')
            .replace(/%3D/gi, ';')
            .replace(/%3F/gi, '?')
            .replace(/%2F/gi, '/'));

        let headers = new HttpHeaders();
            headers = headers.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        return this.http.post<JsonResponse<Vigile>>(`/vvf/vigili/uploadFoto`, httpParams, {
            headers
        })
    }
}
