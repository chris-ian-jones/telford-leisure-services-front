import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountRecoveryService } from '../account-recovery.service';
import { PasswordConfirmValidator } from './../../../core/validators/confirm-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('errorSummaryDiv', {static: false}) errorSummaryDiv!: ElementRef;
  @Input() memberEmail!: string;
  @Input() confirmationCode!: string;
  @Output() changeComponentEvent = new EventEmitter<any>();
  passwordForm!: FormGroup;
  errorSummary: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private accountRecoveryService: AccountRecoveryService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initPasswordForm();
  }

  initPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{0,}$/)
      ]],
      confirmPassword: ['', Validators.required],
    }, {updateOn: 'submit'})
  }

  checkPasswords() {
    const password = this.passwordForm.controls['password'].value;
    const confirmPassword = this.passwordForm.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      this.passwordForm.controls['confirmPassword'].setErrors({match: true})
    }
}

  onClickContinue() {
    this.checkPasswords();
    if (this.passwordForm.valid) {
      const payload = {
        email: this.memberEmail,
        confirmationCode: this.confirmationCode,
        password: this.passwordForm.controls['password'].value,
      }
      this.accountRecoveryService.changePassword(payload).subscribe((response:any) => {
        this.changeComponentEvent.emit('password-reset') // todo create component
      }, error => {
        this.passwordForm.controls['password'].setErrors({token: true})
        this.getAllFormValidationErrors();
      })
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.passwordForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.passwordForm.get(control).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(error => {
          this.errorSummary.push(
            {
              control,
              error
            }
          )
        });
        setTimeout(() => this.errorSummaryDiv.nativeElement.focus())
      }
    });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl], {state: { route: 'email-confirm', path: 'forgot-password' }} );
  });
}

}
