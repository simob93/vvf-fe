import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { KeyValuePeriodo } from 'src/app/model/KyeValuePeriodo';
import { MagazzinoService } from 'src/app/service/magazzino.service';

@Component({
  selector: 'app-scadenza-articoli-list-storico',
  templateUrl: './scadenza-articoli-list-storico.component.html',
  styleUrls: ['./scadenza-articoli-list-storico.component.scss']
})
export class ScadenzaArticoliListStoricoComponent implements OnInit, OnDestroy {

  _onDestroy: Subject<any> = new Subject<any>();
    listaScadenze$: Observable<KeyValuePeriodo[]> = null;
    storico: boolean = false;

    displayedColumns: any = ['dal', 'al']
    constructor(private magazzinoService: MagazzinoService,
        public dialogRef: MatDialogRef<ScadenzaArticoliListStoricoComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,) { }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    getStorico() {
        this.listaScadenze$ = this.magazzinoService.storicoRinnovi(this.data['articoloId']).pipe(map(resp => resp.data));
    }

    ngOnInit() {
        this.getStorico()
    }

}
