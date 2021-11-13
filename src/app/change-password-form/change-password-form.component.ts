import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {

  myForm: FormGroup

  @Output() afterChangePassword : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  onClickBtnChangePwd() {

      this.authService.changePassword(this.myForm.value)
      .pipe(
        filter(resp => resp.success)
      )
      .subscribe(resp => {
        this.afterChangePassword.emit(resp.data);
      })
  } 
  /**
   * 
   * @param control 
   */
  checkPassword(control: AbstractControl) {
    
    let password = control.get('newPassword').value,
        newPassword = control.get('newPasswordCheck').value;

    if (!password || !newPassword) {
      return null;
    }
    return (password != newPassword ? { pwdNotSame: true } : null)
  }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordCheck: ['', [Validators.required]],
    },
      {
        validators: this.checkPassword
      })
  }

}
