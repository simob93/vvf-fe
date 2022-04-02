import { Injectable } from '@angular/core';
import { LoaderService } from '.';
import { HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import * as LoginAction from '../actions/login.action';
import { JsonResponse } from '../model';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
    mostraMessaggio: boolean = false;
    constructor(
        private router: Router,
        private store: Store<AppState>,
        private loaderService: LoaderService,
        private messageService: MessageService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLoader();
        return next.handle(req.clone({
            setHeaders: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              },
        })).pipe(
            catchError(err => {
                console.error('Attenzione errore chiamata ' + req.url + 'con il seguente errore' + err.message);
                if (err.status == 401) { //non sei autenticato
                    this.store.dispatch(new LoginAction.DoLogOutAction())
                    this.router.navigate(['login']);
                } else if(err instanceof HttpErrorResponse) {
                    let resp = err.error as JsonResponse<any>;
                    this.messageService.show({success: false, showDialog: true, message: resp.message.map(el => el.testo)});                
                    
                }
                return throwError(err);
            }),     
            tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.onEnd();
                let body = event.body;
                if (event.status == 401) { //non sei autenticato
                    this.store.dispatch(new LoginAction.DoLogOutAction())
                    this.router.navigate(['login']);
                    //return false;
                }

                if (('data' in body) && ('success' in body) && ('message' in body)) {
                    let resp = body as JsonResponse<any>;
                    if (!resp.success)
                        this.messageService.show({success: body.success, showDialog: !body.success, message: body.message.map(el => el.testo)});
                }
            }
        }),finalize(() => this.onEnd()));
    }
    private onEnd(): void {
        this.hideLoader();
    }
    private showLoader(): void {
        this.loaderService.show();
    }
    private hideLoader(): void {
        this.loaderService.hide();
    }
}
