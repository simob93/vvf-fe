import { Component, OnInit, Inject } from '@angular/core';
import { Scadenze } from '../../model';
import { VigileService } from '../../service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GeneralService } from '../../service/general.service';
import { ScadenzeService } from '../../service/scadenze.service';
import 'moment/locale/it';
import { forkJoin } from 'rxjs';
import { formattaData } from 'src/app/utils/functions';

@Component({
    selector: 'app-form-scadenze',
    templateUrl: './form-scadenze.component.html',
    styleUrls: ['./form-scadenze.component.scss']
})
export class FormScadenzeComponent implements OnInit {

    scadenza: Scadenze = new Scadenze();
    listCboxScadenze: Array<any>;
    listFrequenze = [];
    listAree = [];
    idVigile: number
    cboxScadenzaSel: any;
    inputTitle: string;
    constructor(
        private vigileService: VigileService,
        private generalService: GeneralService,
        @Inject(MAT_DIALOG_DATA) public  data,
        private scadenzeService: ScadenzeService,
        public dialogRef: MatDialogRef<FormScadenzeComponent>) { 
            if (data['idVigile']) {
                this.idVigile = data['idVigile'];
            }
            if (data['scadenza'] && data['scadenza']['idArea']) {
                this.fetchCboxTypeScadenze(data['scadenza']['idArea'])
                this.scadenza = data['scadenza'];

            }
            this.inputTitle = data['inputTitle'] ? "(" + data['inputTitle'] + ")" : '';

    }
    /**
     * 
     * @param event 
     */
    onSelChangeSelectScadenze(event) {
        this.cboxScadenzaSel = this.listCboxScadenze.filter(rec => rec['codice'] == event.value)[0];
        if (this.scadenza.dateFrom) {
            this.calcExpiryDate(this.scadenza.dateFrom);
        }
    }
    /**
     * 
     * @param date 
     */
    calcExpiryDate(date) {
        //la data è un istanza di tipo moment
        if (date != null) {
            if (this.cboxScadenzaSel) {
                let rec = this.listFrequenze.filter(rec => rec['idPerson'] == this.cboxScadenzaSel['idPerson'])[0]
                if (rec) {
                    this.scadenza.dateExpiration = date.clone().add(rec['expirationEvery'], 'year');
                }
            }
        }
    }
    /**
     * 
     * @param event 
     */
    onChangeDataRinnovo(event) { 
        this.calcExpiryDate(event.value);
    }
    /**
     * 
     * @param event 
     */
    onChangeRadioTipo(event) {
        this.fetchCboxTypeScadenze(event.value)
    }
    /**
     * 
     * @param tipo 
     */
    fetchCboxTypeScadenze(tipo) {
        this.vigileService.cboxTypeScadenze(this.idVigile, tipo).subscribe(data => {
            this.listCboxScadenze = data['data'];
        })
    }
    /**
     * 
     * @param scadenza 
     */
    onClickConferma(scadenza) { 

        const {
            callbackFnAfterConfirm
        } = this.data;

        const {
            dateFrom,
            dateExpiration
        } = scadenza


        scadenza.dateFrom = formattaData(dateFrom);
        if(scadenza.dateExpiration) {
            scadenza.dateExpiration = formattaData(dateExpiration);    
        }

        Object.assign(scadenza, {
            idVigile: this.idVigile
        });

        if (scadenza.id) {
            this.scadenzeService.update(scadenza).subscribe(
                data => {
                    if(data['success']) {
                        callbackFnAfterConfirm()
                        this.dialogRef.close();
                    }
                })
        } else {
            this.scadenzeService.save(scadenza).subscribe(
                data => {
                    if(data['success']) {
                        callbackFnAfterConfirm()
                        this.dialogRef.close();
                    }
                });
        }
        
    }

    ngOnInit() {
        //mi scarico le frequenze
        forkJoin(
            this.generalService.listPersonFrequenze(),
            this.generalService.listAreeExpiry()
        ).subscribe(([respFreq, respAree]) => {
            this.listFrequenze = respFreq['data'];
            this.listAree = respAree['data'];
        })
    }

}
