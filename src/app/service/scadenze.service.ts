import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scadenze } from '../model';
import { tap } from 'rxjs/operators';
import { GeneralService } from './general.service';


@Injectable({
    providedIn: 'root'
})
export class ScadenzeService {
        
    constructor(
        private http: HttpClient,
        private generalService: GeneralService) { }
    /**
     * 
     * @param scadenza 
     */
    save(scadenza) {
        return this.http.post<Scadenze>('/vvf/expiry/new', scadenza).pipe(
            tap(rec => {
                if (rec['success']) {
                    //this.generalService.listNotification().subscribe(data => {})
                }
            })
        )
    }
    /**
     * 
     * @param scadenza 
     */
    update(scadenza) {
        return this.http.post<Scadenze>('/vvf/expiry/update', scadenza)
        .pipe(
            tap(rec => {
                if (rec['success']) {
                    //this.generalService.listNotification().subscribe(data => {});
                }
            })
        )
    }
    /**
     * 
     * @param id 
     */
    delete(id): any {
        return this.http.get(`/vvf/expiry/${id}/delete`)
        .pipe(
            tap(rec => {
                if (rec['success']) {
                    //this.generalService.listNotification().subscribe(data => {});
                }
            })
        )
    }
    /**
     * 
     */
    getColumnsTable(cmp?) {
        let params = {
            cmp: cmp || ''
        }
        return this.http.get(`/vvf/expiry/cal/columns`, {params});
    }
    /**
     * 
     * @param cmp 
     */
    getCal(cmp?) {
        let params = {
            cmp: cmp || ''
        }
        return this.http.get(`/vvf/expiry/cal`, {params});
    }
    /**
     * 
     * @param url 
     */
    print(url) {
        return this.http.post<Blob>(`/vvf/expiry/${url}`, null, {observe: 'response', responseType: 'blob' as 'json'}).subscribe((res) => {
            let blob = new Blob([res.body], { type: 'application/pdf' });
            let fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
        });
    }
}
