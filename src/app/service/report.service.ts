import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private http: HttpClient) {}
    /**
     * 
     * @param idVigile 
     * @returns 
     */
    stampaDotazioniVigile(idVigile): any {
        return this.http.post<Blob>(`/vvf/rpt/dotazione?idVigile=${idVigile}`, null, {observe: 'response', responseType: 'blob' as 'json'})
        .subscribe((res) => {
            let blob = new Blob([res.body], { type: 'application/pdf' });
            let fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
        });
    }
    
}