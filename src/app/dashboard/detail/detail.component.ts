import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
    idVigile: number = null;
    private _onDestroy: Subject<any> = new Subject<any>();
    constructor(private store: Store<AppState>) {
            
    }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    ngOnInit() {
        this.store.select(
            rec => rec.detailVigiliReducer)
            .pipe(
                takeUntil(this._onDestroy),
                //filter(vigileSel => vigileSel['data'] != null)
            )
            .subscribe(vigileSel => {
                if (vigileSel['data'] != null)
                    this.idVigile = vigileSel['data']['id'];
            })
    }
}
