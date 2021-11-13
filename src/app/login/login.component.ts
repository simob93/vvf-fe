import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as LoginAction from '../actions/login.action'
import * as PermissionAction from '../actions/permission.action'
import { AuthService } from '../service/auth.service';
import { filter, map, takeUntil } from 'rxjs/operators';
import { LoginResponse } from '../model/loginResponse';
import { Router } from '@angular/router';
import { ChangePassword } from '../model/change-password';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  showChangePassword: boolean = false;
  showLogin: boolean = true;
  private _onDestroy: Subject<any> = new Subject<any>();
  loginData: LoginResponse;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnDestroy(): void {

    this._onDestroy.next();
    this._onDestroy.complete();
  }

    /**
     * 
     * @param changePasswordParams 
     */
    callbackChangePassword(changePasswordData) {
        this.store.dispatch(new PermissionAction.FetchPermessiAction(this.loginData.permessi));
        this.router.navigate(['/']);
    }

  

  ngOnInit() {
    this.store.select(reducer => reducer.loginReducer)
    .pipe(
      takeUntil(this._onDestroy),
      filter(state => state.success),
    )
    .subscribe(state => {
      if (state.data) {
          const {
            permessi,
            primoAccesso
          } = state.data
          if (!primoAccesso) {
            this.loginData = state.data;
            this.showChangePassword = true;
            this.showLogin = false;
          } else {
            // dispatch action permessi
            this.router.navigate(['/']);
            this.store.dispatch(new PermissionAction.FetchPermessiAction(permessi));
          }
      }
    });

  }

}
