import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { GetContextMenuItemsParams, MenuItemDef } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { StandardMessageComponent } from 'src/app/common/standard-message/standard-message.component';
import { ArticoliScadenza } from 'src/app/model/articoliScadenza';
import { ArticoliScadenzaList } from 'src/app/model/articoliScadenzaList';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { ReportService } from 'src/app/service/report.service';
import { ScadenzaArticoliFormComponent } from '../scadenza-articoli-form/scadenza-articoli-form.component';
import { ScadenzaArticoliListStoricoComponent } from '../scadenza-articoli-list-storico/scadenza-articoli-list-storico.component';

@Component({
  selector: 'mag-scadenza-articoli-list',
  templateUrl: './scadenza-articoli-list.component.html',
  styleUrls: ['./scadenza-articoli-list.component.scss']
})
export class ScadenzaArticoliListComponent implements OnInit, OnDestroy {
  _onDestroy: Subject<any> = new Subject<any>();
  listaScadenze$: Observable<ArticoliScadenzaList> = null;
  storico: boolean = false;

  displayedColumns: any = ['info', 'descrArticolo', 'descrTipoScadenza', 'dataScadenza', 'action']
  constructor(private magazzinoService: MagazzinoService,
    private reportService: ReportService,
    private dialog: MatDialog) { }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  stampa() {
    this.reportService.stampaScadenzeArticoli().subscribe(() => {});
  }

  rinnovaScadenza(recScadenza: ArticoliScadenzaList) {
    this.dialog.open(ScadenzaArticoliFormComponent, {
      data: {
        titolo: 'RINNOVA_SCADENZA',
        rinnova: true,
        scadenza: recScadenza
      }
    }).afterClosed().subscribe(() => {
      this.getScadenze();
    })
  }
  elimina(scadenza: ArticoliScadenzaList) {

    this.dialog.open(StandardMessageComponent, {
      data: {
          type: 'DEL',
          callbackOnOk: () => {
            this.magazzinoService.eliminaScadenza(scadenza.scadenzaId)
            .subscribe(() => this.getScadenze());
          }
      }
  });

  }
  /**
   * 
   * @param scadenza 
   */
  storicoRinnovi(scadenza: ArticoliScadenzaList) {
    this.dialog.open(ScadenzaArticoliListStoricoComponent, {
      width: "350px",
      height: "400px",
      data: {
        articoloId: scadenza.articoloId
      }
    })
  }
  /**
   * 
   * @param scadenza 
   */
  riattiva(scadenza: ArticoliScadenzaList) {
    this.magazzinoService.riattivaScadenzaArticolo(scadenza.scadenzaId)
      .subscribe(() => this.getScadenze());
  }
  /**
   * 
   * @param scadenza 
   */
  effettua(scadenza: ArticoliScadenzaList) {
    this.magazzinoService.effettuaScadenzaArticolo(scadenza.scadenzaId)
      .subscribe(() => this.getScadenze());
  }

  clickBtnNuovo() {
    this.dialog.open(ScadenzaArticoliFormComponent, {})
      .afterClosed()
      .subscribe(() => {
        this.getScadenze();
      })
  }

  get isStorico() {
    return this.storico;
  }

  getScadenze() {
    this.listaScadenze$ = this.magazzinoService.listScadenzaArticoli({
      storico: this.storico
    }).pipe(map(resp => resp.data));
  }

  tabChange(tabChangeEvent: MatTabChangeEvent) {
    this.storico = false;
    if (tabChangeEvent.index == 1) {
      this.storico = true;
    }
    this.getScadenze();
  }

  ngOnInit() {
    this.getScadenze();
  }
}
