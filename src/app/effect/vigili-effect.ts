import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, EMPTY, forkJoin, iif } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { VigileService, ServizioService} from '../service';
import * as VigiliAction from '../actions/vigiliAction';
import * as VigiliDetailAction from '../actions/vigiliDetailAction';
import * as VigilePatentiAction from '../actions/vigilePatentiAction';
import * as VigileCertificazioniAction from '../actions/vigileCertificazioniAction';
import { CarrieraService } from '../service/carriera.service';
import { GradoService } from '../service/grado.service';
import { AssenzeService } from '../service/assenzeService';
import * as moment from 'moment';

@Injectable()
export class VigiliEffect {

    constructor(
        private actions$: Actions,
        private servizioService: ServizioService,
        private vigiliService: VigileService,
        private mansioniService: CarrieraService,
        private gradoService: GradoService,
        private assenzeService: AssenzeService
    ) {

    }

    @Effect()
    listVigili$ = this.actions$
        .pipe(
            ofType(VigiliAction.FETCHING),
            switchMap(action => {
                return this.vigiliService.list(action['limit'], action['start'], null)
                .pipe(
                    map(resp => ( new VigiliAction.SuccessAction(resp))),
                    catchError(() => EMPTY)
                )}
            )
        )
    /**
     * Dettaglio del vigile, con caricamento patenti
     */
    @Effect()
    detail$ = this.actions$
        .pipe(
            ofType(VigiliDetailAction.FETCHING),
            switchMap(action => {
                return forkJoin(
                    this.vigiliService.get(action['id']),
                    this.servizioService.list(action['id'], moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')),
                    this.mansioniService.listBy(action['id'], moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')),
                    this.assenzeService.getLastActive({idVigile: action['id'], data:moment().format('YYYY-MM-DDTHH:mm:ss')})

                ).pipe(
                    map(([respVigile, respServizio, respMansione, respAssenza]) => {
                       return {...respVigile['data'], servizio: respServizio['data'], mansione: respMansione, assente: !!respAssenza['data']}
                    }),
                    map(resp => ({ type: VigiliDetailAction.SUCCESS, payload: resp })),
                    catchError(() => EMPTY)
                )
            })
        )
    /**
     *  caricamento patenti di servizio del vigile
     */
    @Effect()
    vigilePatenti$ = this.actions$
        .pipe(
            ofType(VigilePatentiAction.FETCHING),
            switchMap(action => {
                return this.vigiliService.listPatenti(action['idVigile'])
                .pipe(
                    map(resp => ( new VigilePatentiAction.SuccessAction(resp))),
                    catchError(() => EMPTY)
                )}
            )
        )

    @Effect()
    vigileCertificati$ = this.actions$
        .pipe(
            ofType(VigileCertificazioniAction.FETCHING),
            switchMap(action => {
                return this.vigiliService.listCertificati(action['idVigile'])
                .pipe(
                    map(resp => ( new VigileCertificazioniAction.SuccessAction(resp))),
                    catchError(() => EMPTY)
                )}
            )
        )
    /*@Effect()
    listScadenze$ = this.actions$
        .pipe(
            ofType(ScadenzeAction.FETCHING),
            switchMap(action => {
                return this.vigiliService.listScadenze(action['idVigile'], null, null, null, 0)
                .pipe(
                    map(resp => ( new ScadenzeAction.SuccessAction(resp))),
                    catchError(() => EMPTY)
                )}
            )
        )*/

}
