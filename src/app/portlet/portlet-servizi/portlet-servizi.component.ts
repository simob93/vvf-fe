import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServizioService, PortletService } from '../../service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
    selector: 'app-portlet-servizi',
    templateUrl: './portlet-servizi.component.html',
    styleUrls: ['./portlet-servizi.component.scss']
})
export class PortletServiziComponent implements OnInit, OnDestroy {
    listServizi$: Observable<any>;
    private _onDestroy: Subject<any> = new Subject<any>();
    displayedColumns: any = [
        {
            headerName: 'Data inizio',
            flex: 1,
            field: 'dateStart',
            valueFormatter: (params) => params['value'] && moment(params['value']).format('DD/MM/YYYY')
        },
        {
            headerName: 'Data fine',
            flex: 1,
            field: 'dateEnd',
            valueFormatter: (params) => params['value'] && moment(params['value']).format('DD/MM/YYYY')
        },
        { headerName: 'Grado', field: 'gradoFormatted', flex: 1, },
        { headerName: 'Squadra', field: 'teamFormatted', flex: 1 }
    ]
    constructor(
        private portletService: PortletService,
        private store: Store<AppState>
    ) { }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    ngOnInit() {

        this.listServizi$ = this.store.select(reducers => reducers.detailVigiliReducer)
            .pipe(
                takeUntil(this._onDestroy),
                filter((vigileSel) => (vigileSel.data != null)),
                switchMap(vigileSel => {
                    return this.portletService.listServizi(vigileSel['data']['id']).pipe(map(resp => resp['data']))
                })
            )

    }
}
