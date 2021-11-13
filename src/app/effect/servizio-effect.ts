import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ServizioService } from '../service';
import * as ServizioAction from '../actions/serviziAction';

@Injectable()
export class ServizioEffect {

    constructor(
        private actions$: Actions,
        private servizioService: ServizioService,
    ) {

    }
    @Effect()
    listServizi$ = this.actions$
        .pipe(
            ofType(ServizioAction.FETCHING),
            switchMap(action => {
                return this.servizioService.list(action['idVigile'])
                .pipe(
                    map(resp => ({ type: ServizioAction.SUCCESS, payload: resp })),
                    catchError(() => EMPTY)
                )
              }
            )
        )
}