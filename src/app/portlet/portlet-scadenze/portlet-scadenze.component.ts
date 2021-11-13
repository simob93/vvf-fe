import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Vigile, Scadenze } from '../../model';
import { AppFetchState } from '../../state';
import { ActivatedRoute } from '@angular/router';
import { PortletService } from '../../service';
import { Subject } from 'rxjs';
import { takeUntil, filter, switchMap, map } from 'rxjs/operators';

@Component({
    selector: 'app-portlet-scadenze',
    templateUrl: './portlet-scadenze.component.html',
    styleUrls: ['./portlet-scadenze.component.scss']
})
export class PortletScadenzeComponent implements OnInit, OnDestroy {
    vigile: Vigile = new Vigile();
    listScadenze: Array<Scadenze>;
    private _onDestroy: Subject<any> = new Subject<any>();
    constructor(
        private store: Store<AppState>,
        private portletService: PortletService) {
    }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    ngOnInit() {

        this.store.select(reducers => reducers.detailVigiliReducer)
            .pipe(
                takeUntil(this._onDestroy),
                filter((vigileSel) => (vigileSel.data != null)),
                switchMap(vigileSel => {
                    return this.portletService.listScadenze(vigileSel['data']['id']).pipe(map(resp => resp['data']))
                })
            ).subscribe(data => {
                this.listScadenze = data as Scadenze[];
            })
    }
}
