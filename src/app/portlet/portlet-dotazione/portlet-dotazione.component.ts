import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Dotazione } from 'src/app/model';
import { AppState } from 'src/app/reducers';
import { PortletService } from 'src/app/service';

@Component({
  selector: 'app-portlet-dotazione',
  templateUrl: './portlet-dotazione.component.html',
  styleUrls: ['./portlet-dotazione.component.scss']
})
export class PortletDotazioneComponent implements OnInit {
  listDotazioni$: Observable<Dotazione[]>
  private _onDestroy: Subject<any> = new Subject<any>();
  displayedColumns: any = [
    {
      headerName: 'Articolo',
      flex: 1,
      field: 'descrArticolo',
    },
    {
      headerName: 'Ultima data di consegna',
      flex: 1,
      field: 'dataUltimaConsegna',
      valueFormatter: (params) => params['value'] && moment(params['value']).format('DD/MM/YYYY')
    }
  ]
  constructor(
    private portletService: PortletService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.listDotazioni$ = this.store.select(reducers => reducers.detailVigiliReducer)
    .pipe(
        takeUntil(this._onDestroy),
        filter((vigileSel) => (vigileSel.data != null)),
        switchMap(vigileSel => {
            return this.portletService.listDotazione(vigileSel['data']['id']).pipe(map(resp => resp.data))
        })
    )
  }

}
