import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, reducers } from '../reducers';
import * as VigiliDetailAction from '../actions/vigiliDetailAction'

import { Vigile } from '../model';
import { EMPTY, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { VigileService } from '../service';

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
        private vigileService: VigileService,
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
                    this.setFoto(detail['data']['foto']);
                    if (detail['data']['servizio'])
                        this.vigile['servizio'] = detail['data']['servizio'].reverse()[0]; 
                    if ( detail['data']['mansione'] ){
                        this.vigile['mansione'] = detail['data']['mansione'] && detail['data']['mansione'].reverse()[0]; 
                    }
                } 
            })
    }
    /**
     * 
     * @param base64 
     */
    setFoto(base64: string) {
        (document.getElementById('img_vigile') as HTMLImageElement).setAttribute(
            'src', (base64 || '/assets/images/general/add_photo.png')
        ); 
    }

    /**
     * 
     * @param input 
     */
    onChangeFile(input) {
        let reader = new FileReader(),
            me = this;

        if (input && input.length > 0) {
            reader.readAsDataURL(input[0]);
            reader.onload = function () {
                console.log(reader.result);
                console.log(reader.result.toString());
                let base64 = reader.result.toString().replace(' ', '+');
                me.vigileService.uploadFoto(me.vigile.id,  base64)
                    .pipe(
                        map(resp => resp.data)
                    )
                    .subscribe(vigile => {
                    me.setFoto(vigile.foto)
                    });
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }

    onClickBtnCaricaFoto() {
        document.getElementById('file').click();
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
