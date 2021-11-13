import { Injectable } from '@angular/core';
import { Certificati } from '../model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable({
    providedIn: 'root'
})
export class VigileCertificatiService {

    constructor(
        private http: HttpClient,
        private generalService: GeneralService) { }

    /**
         * 
         * @param vigile 
         */
    update(listVigileCertificati: Certificati[]) {
        return this.http.post<Certificati[]>('/vvf/vigili/certified/update', listVigileCertificati);
    }
    /**
     * 
     * @param vigile 
     */
    save(listVigileCertificati: Certificati[]) {
        return this.http.post<Certificati[]>('/vvf/vigili/certified/new', listVigileCertificati)
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
        return this.http.get<number>(`/vvf/vigili/certified/${id}/delete`);
    }
}
