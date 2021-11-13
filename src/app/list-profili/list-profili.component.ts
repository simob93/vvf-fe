import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';
import { RuoliService } from '../service/ruoli.service';
import { KeyValue } from '../model/keyValue';
import { GestProfiliService } from '../service/profili-shared.service';

@Component({
  selector: 'app-list-profili',
  templateUrl: './list-profili.component.html',
  styleUrls: ['./list-profili.component.scss']
})
export class ListProfiliComponent implements OnInit, OnDestroy {

  _onDestroy: Subject<any> = new Subject<any>();
  gridApi: any;
  // definizione colonne
  displayedColumns: any = [
    {
      headerName: 'Descrizione',
      flex: 1,
      field: 'valore'
    }

  ]

  constructor(private ruoliService: RuoliService, 
      private gestProfiliService: GestProfiliService) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  /**
   * 
   * @param params 
   */
  onSelectionChanged(params) {
    const record = this.gridApi.getSelectedRows()[0] as KeyValue;
    this.gestProfiliService.setProfilo(record && record.codice);
  }
  /**
   * 
   * @param params 
   */
  onGridReady(params) {
    this.gridApi = params.api;
    
    //this.caricaGriglia();
    this.gestProfiliService.nextProfili
    .pipe(
      takeUntil(this._onDestroy)
      //filter((newId) => newId != null)
    )
    .subscribe(newId => {
      this.caricaGriglia(newId);
    })

  }
  /**
   * 
   * @param idSel 
   */
  caricaGriglia(idSel?) {
    this.gridApi.deselectAll();
    this.ruoliService.listCbox()
      .pipe(
        takeUntil(this._onDestroy),
        map(response => response.data)
      ).subscribe(data => {
        if (data) {
          this.gridApi.setRowData(data);
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
  getRowNodeId = (data) => data.codice

  ngOnInit(): void {
    
  }

}
