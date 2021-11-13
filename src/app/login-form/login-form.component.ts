import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as LoginAction from '../actions/login.action'
import { AuthService } from '../service/auth.service';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class LoginFormComponent implements OnInit {
  myForm: FormGroup;
  showResetPassword: boolean = false;

  @Output() afterLogin: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder, 
    private store: Store<AppState>) { }

  onClickBtnLogin() {
    // autenticazione + permessi
    this.store.dispatch(new LoginAction.FetchingAction(this.myForm.value));
  }

  onClickResetPassword() {
    this.showResetPassword = true;
  }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      username:           ['', [Validators.required]],
      password:           ['', [Validators.required]]
    })

  }

}
