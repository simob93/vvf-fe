import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppFetchState } from '../../state';
import { Vigile } from '../../model';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { PortletService } from '../../service';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, filter } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'app-portlet-autorizzazioni',
    templateUrl: './portlet-autorizzazioni.component.html',
    styleUrls: ['./portlet-autorizzazioni.component.scss']
})
export class PortletAutorizzazioniComponent implements OnInit, OnDestroy {
    private _onDestroy: Subject<any> = new Subject<any>();
    displayedColumns: any = [
        {
            headerName: 'Autorizzazione',
            flex: 1,
            field: 'certifiedFormatted',
        },
        {
            headerName: 'Data di rilascio',
            flex: 1,
            field: 'date',
            valueFormatter: (params) => params['value'] && moment(params['value']).format('DD/MM/YYYY')
        }
    ];
    listAutorizzazioni$: Observable<any>;
    constructor(
        private store: Store<AppState>,
        private portletService: PortletService
    ) {
    }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    ngOnInit() {

        this.listAutorizzazioni$ = this.store.select(reducers => reducers.detailVigiliReducer)
            .pipe(
                takeUntil(this._onDestroy),
                filter((vigileSel) => (vigileSel.data != null)),
                switchMap(vigileSel => {
                    return this.portletService.listVigileCertificati(vigileSel['data']['id']).pipe(map(resp => resp['data']))
                })
            )
    }

}
