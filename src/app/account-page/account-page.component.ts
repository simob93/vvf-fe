import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Utente } from '../model/utenti';
import { JsonResponse } from '../model';
import { UtentiService } from '../service/utenti.service';
import { map, tap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-account-page',
    templateUrl: './account-page.component.html',
    styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit, OnDestroy {

    _onDestroy: Subject<any> = new Subject<any>();
    gridApi: any;
    idUtente: any;
    // definizione colonne
    displayedColumns: any = [
        {
            headerName: 'Nominativo',
            flex: 1,
            valueGetter :(params) =>  params.data.cognome + ' ' + params.data.nome
        },
       
    ]

    constructor(private utentiService: UtentiService) { }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * 
     * @param resp 
     */
    onCallback_salvaRecord(resp) {
        this.caricaGriglia(resp && resp.data.id);
    }
    /**
     * 
     * @param params 
     */
    onSelectionChanged(params) {
        const record = this.gridApi.getSelectedRows()[0];
        if (record) {
            const {
                id
            } = record;
            this.idUtente = id;
        } else {
            this.idUtente = null;
        }
        
    }
    /**
     * 
     * @param params 
     */
    onGridReady(params) {
        this.gridApi = params.api;
        this.caricaGriglia();
    }
    /**
     * 
     * @param idSel 
     */
    caricaGriglia(idSel?) {
        this.gridApi.deselectAll();
        this.utentiService.listUtenti()
        .pipe(
            takeUntil(this._onDestroy),
            map(response => response.data)
        ).subscribe(data => {
            this.gridApi.setRowData( data );
            if (data) {

                if (idSel) {
                    // seleziono la riga 
                    const recSel = this.gridApi.getRowNode(idSel);
                    if (recSel)
                        recSel.setSelected(true, true);
                }
            }
        });
    }
    /**
     * 
     */
    getRowNodeId = (data) => data.id

    ngOnInit() {
        
    }

}
