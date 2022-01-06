import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as LoginAction from '../actions/login.action';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LoginEffect {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) {

    }

    @Effect()
    sigIn$ = this.actions$
        .pipe(
            ofType(LoginAction.FETCHING),
            switchMap(action => this.authService.singIn(action['payload'])
                .pipe(
                    switchMap(data => {
                        if (data.success) {
                            if (data.data.accessToken) {
                                localStorage.setItem('isLogged', 'true');
                                localStorage.setItem('accessToken', data.data.accessToken);
                                return this.authService.getPermissionByRole(data.data.idRole)
                                .pipe(
                                    map(resp => {
                                        // aggancio i permessi
                                        data.data.permessi = resp.data;
                                        localStorage.setItem('userLogged', JSON.stringify(data.data));
                                        return data;
                                    })
                                );
                            } else {
                                return of({ type: LoginAction.FAILED, payload: null });
                            }      
                        } else {
                            return  of({ type: LoginAction.FAILED, payload: null });
                        }
                    }),
                    map(resp =>  {
                        return { type: LoginAction.SUCCESS, payload: resp }
                    })
                ),
            )
        )


    @Effect()
    logOut$ = this.actions$
        .pipe(
            ofType(LoginAction.DO_LOG_OUT),
            switchMap(action => of({})
            .pipe(
                map(() => {
                    localStorage.removeItem('isLogged');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userLogged');
                    return {type: LoginAction.LOG_OUT, payload: null }
                })
            )
        ))
}