import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { PortletService } from '../service';
import * as PortletVigilePatentiAction from '../actions/portletVigilePatentiAction';
import * as PortletVigileCertificazioniAction from '../actions/portletVigileCertificazioniAction';
import * as PortletVigileScadenzeAction from '../actions/portletVigileScadenzeAction';

@Injectable()
export class PortletEffect {

    constructor(
        private actions$: Actions,
        private portletService: PortletService,
    ) {

    }

    @Effect()
    listVigilePatenti$ = this.actions$
        .pipe(
            ofType(PortletVigilePatentiAction.FETCHING),
            switchMap(action => {
                return this.portletService.listVigilePatenti(action['idVigile'])
                .pipe(
                    map(resp => ({ type: PortletVigilePatentiAction.SUCCESS, payload: resp })),
                    catchError(() => EMPTY)
                )}
            )
        )
    @Effect()
    listVigileCertificati$ = this.actions$
        .pipe(
            ofType(PortletVigileCertificazioniAction.FETCHING),
            switchMap(action => {
                return this.portletService.listVigileCertificati(action['idVigile'])
                .pipe(
                    map(resp => ({ type: PortletVigileCertificazioniAction.SUCCESS, payload: resp })),
                    catchError(() => EMPTY)
                )}
            )
        )
    @Effect()
    listScadenze$ = this.actions$
        .pipe(
            ofType(PortletVigileScadenzeAction.FETCHING),
            switchMap(action => {
                return this.portletService.listScadenze(action['idVigile'])
                .pipe(
                    map(resp => ({ type: PortletVigileScadenzeAction.SUCCESS, payload: resp })),
                    catchError(() => EMPTY)
                )}
            )
        )
       
}