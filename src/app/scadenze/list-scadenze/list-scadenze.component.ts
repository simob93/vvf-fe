import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormScadenzeComponent } from '../form-scadenze/form-scadenze.component';
import { ActivatedRoute } from '@angular/router';
import { VigileService, PersonService, GeneralService } from '../../service';
import { Scadenze } from '../../model';
import * as moment from 'moment';
import 'moment/locale/it';
import { ScadenzeService } from '../../service/scadenze.service';
import { StandardMessageComponent } from '../../common/standard-message/standard-message.component';
import { Subject } from 'rxjs';
import { AppState, reducers } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { takeUntil, filter, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-list-scadenze',
    templateUrl: './list-scadenze.component.html',
    styleUrls: ['./list-scadenze.component.scss']
})
export class ListScadenzeComponent implements OnInit, OnDestroy {
    srcText: string = "";
    idVigile;
    tipologia = [];
    from: Date = null;
    to:Date = null;
    type: String = null; 
    storico: boolean = false;
    private _onDestroy: Subject<any> = new Subject<any>();

    listScadenze: Array<Scadenze> = [];
    constructor(
        private store: Store<AppState>,
        private dialog: MatDialog,
        private scadenzeService: ScadenzeService,
        private vigileService: VigileService,
        private generalService: GeneralService,
        private route: ActivatedRoute) {
    }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * 
     */
    fetchAree() {
        this.generalService.listAreeExpiry().subscribe(resp => {
            this.tipologia = resp['data'];
            this.tipologia.push({
                id: 0,
                name: 'Visualizza tutto'
            })
        });
    }
    onClickRenewScadenza(scadenza) {
        scadenza = Object.assign({}, scadenza);
        delete scadenza.id;
        delete scadenza.dateFrom;
        delete scadenza.dateExpiration;
        delete scadenza.note;
        this.showDialog(scadenza, true, 'Rinnova scadenza');
    }
    /**
     * 
     */
    fetchData() {
        this.vigileService.listScadenze(this.idVigile, this.from, this.to, this.type, this.storico).subscribe(
            data => {
                this.listScadenze = data['data'];
        })
    }
    /**
     * 
     * @param scadenza 
     */
    onClickDeleteScadenza(scadenza) {

        this.dialog.open(StandardMessageComponent, {
            data: {
                type: 'DEL',
                callbackOnOk: () => {
                    this.scadenzeService.delete(scadenza['id']).subscribe(rec => {
                        if (rec['success'])
                            this.fetchData();
                    })
                }
            }
        });       
    }
    /**
     * 
     * @param scadenza 
     */
    showDialog(scadenza?, renew = false, inputTitle = '') {
        scadenza = Object.assign({}, scadenza);
        this.dialog.open(FormScadenzeComponent, {
            data: {
                idVigile: this.idVigile,
                renew, 
                scadenza,
                inputTitle,
                callbackFnAfterConfirm: () => {
                    this.fetchData();
                }
            }
        });
    }
    /**
     * 
     */
    onClickBtnNuovo() {
        this.showDialog(null, false, 'Nuova scadenza');
    }
    /**
     * 
     * @param scadenza 
     */
    onClickEditScadenza(scadenza) {
       this.showDialog(scadenza, false, 'Modifica Scadenza');
    }   

    ngOnInit() {

        this.store.select(reducer => reducer.detailVigiliReducer)
        .pipe(
            takeUntil(this._onDestroy),
            filter(vigileSel => vigileSel['data'] != null)
        )
        .subscribe(vigileSel => {
            this.idVigile = vigileSel['data']['id'];
            this.fetchData();
            this.fetchAree();
        })
    }
}
