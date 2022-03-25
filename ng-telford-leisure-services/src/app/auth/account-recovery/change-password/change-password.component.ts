import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountRecoveryService } from '../account-recovery.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Input() memberEmail!: string;
  @Input() confirmationCode!: string;
  @Output() changeComponentEvent = new EventEmitter<any>();
  passwordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountRecoveryService: AccountRecoveryService
  ) { }

  ngOnInit() {
    this.initPasswordForm();
  }

  initPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    if (this.passwordForm.valid) {
      const payload = {
        email: this.memberEmail,
        confirmationCode: this.confirmationCode,
        password: this.passwordForm.controls['password'].value,
      }
      this.accountRecoveryService.changePassword(payload).subscribe((response:any) => {
        this.changeComponentEvent.emit('password-reset')
      }, error => {
        // todo
      })
    }
  }

}
