import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatentiServizio } from '../model/patentiServizio';
import { tap } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable({
    providedIn: 'root'
})
export class VigilePatentiService {

    constructor(
        private http: HttpClient,
        private generalService: GeneralService) { }

    /**
       * 
       * @param vigile 
       */
    update(listVigilePatenti: PatentiServizio[]) {
        return this.http.post<PatentiServizio[]>('/vvf/vigili/patenti/update', listVigilePatenti);
    }
    /**
     * 
     * @param vigile 
     */
    save(listVigilePatenti: PatentiServizio[]) {
        return this.http.post<PatentiServizio[]>('/vvf/vigili/patenti/new', listVigilePatenti)
        .pipe(
            tap(rec => {
                if (rec['success']) {
                    this.generalService.listNotification().subscribe(data => {});
                }
            })
        )
    }
    /**
     * 
     * @param id 
     */
    delete(id) {
        return this.http.get<number>(`/vvf/vigili/patenti/${id}/delete`);
    }
}
