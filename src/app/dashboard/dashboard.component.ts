import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as VigiliDetailAction from '../actions/vigiliDetailAction'

import { Vigile } from '../model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    vigile: Vigile = new Vigile();
    noVigileSel: boolean = true;
    private _onDestroy: Subject<any> = new Subject();
    constructor(
        translate: TranslateService,
        private store: Store<AppState>

    ) {

        translate.setDefaultLang('it');
        translate.use('it');

        this.store.select(
            rec => rec.detailVigiliReducer)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(detail => {
                this.noVigileSel = (detail['data'] == null) && !detail.isFetching;
                if (detail['data']) {
                    this.vigile = Object.assign({}, detail['data']);
                    
                    if (detail['data']['servizio'])
                        this.vigile['servizio'] = detail['data']['servizio'].reverse()[0]; 
                    if ( detail['data']['mansione'] ){
                        this.vigile['mansione'] = detail['data']['mansione'] && detail['data']['mansione'].reverse()[0]; 
                    }
                } 
            })
    }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    refreshDasboard(vigile) {
        //this.store.dispatch(new VigileSelAction.Selection(vigile));
        this.store.dispatch(new VigiliDetailAction.FetchingAction(vigile['id']));
        //this.store.dispatch(new PortletVigilePatentiAction.FetchingAction(vigile['id']));
        //this.route.navigate(['vigile', vigile['id']], {relativeTo: this.activatedRoute})
            
    }

    ngOnInit() {
        console.log('entrato')
    }

}
