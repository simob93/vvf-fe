import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PortletService {

    constructor(private http: HttpClient) { }

    
    /**
     * 
     * @param idVigile 
     */
    listVigilePatenti(idVigile): any { 
        return this.http.get<any[]>(`/vvf/portlet/${idVigile}/patenti`);
    }
    /**
     * 
     * @param idVigile 
     */
    listVigileCertificati(idVigile): any { 
        return this.http.get<any[]>(`/vvf/portlet/${idVigile}/certified`);
    }
    /**
     * 
     * @param idVigile 
     */
    listScadenze(idVigile): any { 
        return this.http.get<any[]>(`/vvf/portlet/expiry`, {
            params: {
                idVigile
            }
        });
    }
    /**
     * 
     * @param idVigile 
     */
    listServizi(idVigile): any { 
        return this.http.get<any[]>(`/vvf/portlet/${idVigile}/services`);
    }
}
