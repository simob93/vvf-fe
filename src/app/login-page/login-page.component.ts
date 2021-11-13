import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getLoginData } from '../reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as PermissionAction from '../actions/permission.action';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

    constructor(
    ) { }
    ngOnDestroy(): void {
    }

    ngOnInit() {

    }

}
