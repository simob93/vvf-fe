import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SubjectNotificationService } from './subject-notification.service';
import { JsonResponse } from '../model';
import { KeyValue } from '../model/keyValue';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(
        private http: HttpClient,
        private subjectNotification: SubjectNotificationService) { }

    getVersioneProgramma() {
        return this.http.get<any>('/vvf/general/versione', {});
    }

    listProvincie() {
        return this.http.get<any>('/vvf/general/provincie', {});
    }

    listComuni(idCity) {
        return this.http.get<any>('/vvf/general/comuni', {
            params: { idCity }
        });
    }
    /**
     * lista di tutte le taglie 
     * @returns 
     */
    listTaglieAbbigliamento() {
        return this.http.get<JsonResponse<KeyValue[]>>('/vvf/general/taglie', {});
    }

    listPersonFrequenze() {
        return this.http.get<any>('/vvf/general/expiry/freq');
    }

    listAree(aree?) {

        let params = { }
        if( aree ) {
            Object.assign(params, {
                area: aree.toString()
            })
        }

        return this.http.get<any>('/vvf/general/aree', {
            params: params
        })
    }

    listAreeExpiry() {
        return this.http.get<any>('/vvf/general/aree/expiry');
    }

    listNotification(): Observable<any> {
        return this.http.get<any>('/vvf/notify/list')
            .pipe(
                map(rec => rec['data']),
                tap(rec => {
                    this.subjectNotification.updateNotification(rec);
                })
            )
    }

}
