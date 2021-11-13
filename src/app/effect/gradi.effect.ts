import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as GradiAction from '../actions/gradi.action';
import { GradoService } from '../service/grado.service';

@Injectable()
export class GradiEffect {

    constructor(
        private actions$: Actions,
        private gradiService: GradoService,
    ) {

    }

    @Effect()
    list$ = this.actions$
        .pipe(
            ofType(GradiAction.FETCHING),
            switchMap(action => {
                return this.gradiService.listBy(action['idServizio'])
                .pipe(
                    map(resp => ({ type: GradiAction.SUCCESS, payload: resp })),
                    catchError(() => EMPTY)
                )}
            )
        )
    
}