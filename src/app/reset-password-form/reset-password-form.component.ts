import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { map, tap, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { JsonResponse } from '../model';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {
  myForm: FormGroup;
  @Output() goToLogin: EventEmitter<any> = new EventEmitter<any>();
  showBoxSuccess: Boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  onClickBtnRecuperaPassword() {
    const {
      username,
      email
    } = this.myForm.value
    this.authService.recoverPassword(username, email)
    .pipe(
      filter(resp => resp.success),
      map(resp => resp.data),
    ).subscribe(result => {
      this.showBoxSuccess = result;
    })
  }

  onClickBtnGoToLogin() {
    this.goToLogin.emit();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required]
    })
  }

}
