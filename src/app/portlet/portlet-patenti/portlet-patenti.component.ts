import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
//import { AppFetchState } from '../../state';
import { AppState } from '../../reducers';
//import { Vigile } from '../../model';
import { ActivatedRoute } from '@angular/router';
import { PortletService } from '../../service';
import { PatentiServizio } from '../../model/patentiServizio';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, filter } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'app-portlet-patenti',
    templateUrl: './portlet-patenti.component.html',
    styleUrls: ['./portlet-patenti.component.scss']
})
export class PortletPatentiComponent implements OnInit, OnDestroy {
    listPatenti$: Observable<any>
    private _onDestroy: Subject<any> = new Subject<any>();
    displayedColumns: any = [
        {
            headerName: 'Patente di servizio',
            flex: 1,
            field: 'licenseFormatted',
        },
        {
            headerName: 'Data di rilascio',
            flex: 1,
            field: 'date',
            valueFormatter: (params) => params['value'] && moment(params['value']).format('DD/MM/YYYY')
        }
    ]
    constructor(
        private portletService: PortletService,
        private store: Store<AppState>) {
    }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    ngOnInit() {

        this.listPatenti$ = this.store.select(reducers => reducers.detailVigiliReducer)
            .pipe(
                takeUntil(this._onDestroy),
                filter((vigileSel) => (vigileSel.data != null)),
                switchMap(vigileSel => {
                    return this.portletService.listVigilePatenti(vigileSel['data']['id']).pipe(map(resp => resp['data']))
                })
            )
    }

}
