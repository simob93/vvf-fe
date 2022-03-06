import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { ScadenzaArticoliFormComponent } from '../scadenza-articoli-form/scadenza-articoli-form.component';

@Component({
  selector: 'mag-scadenza-articoli-list',
  templateUrl: './scadenza-articoli-list.component.html',
  styleUrls: ['./scadenza-articoli-list.component.scss']
})
export class ScadenzaArticoliListComponent implements OnInit, OnDestroy {
  _onDestroy: Subject<any> = new Subject<any>();
  gridApi: any;
  displayedColumns: any = [
    {
      headerName: 'Descrizione articolo',
      field: 'descrArticolo',
      flex: 1
    },
    {
      headerName: 'Data rinnovo',
      field: 'dataRinnovo',
    },
    {
      headerName: 'Data scadenza',
      field: 'dataScadenza',
    },
    {
      headerName: '',
      cellClass: "cell-vertical-align-text",
      width: 80,
      cellRenderer: () => {
        return '<span><i class="material-icons">more_vert</i></span>'
      }
    }
  ]
  constructor(private magazzinoService: MagazzinoService, 
    private dialog: MatDialog) { }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  /**
   * 
   * @param idSel 
   */
  caricaGriglia(idSel?) {
    this.gridApi.deselectAll();
    this.magazzinoService.listScadenzaArticoli()
      .pipe(
        takeUntil(this._onDestroy),
        map(response => response.data)
      ).subscribe(data => {
        this.gridApi.setRowData(data);
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

  getRowNodeId = (data) => data.articoloId

  /**
     * 
     * @param params 
     */
  onGridReady(params) {
    this.gridApi = params.api;
    this.caricaGriglia();
  }

  clickBtnNuovo() {
    this.dialog.open(ScadenzaArticoliFormComponent, {})
  }

  ngOnInit() {
  }


}
