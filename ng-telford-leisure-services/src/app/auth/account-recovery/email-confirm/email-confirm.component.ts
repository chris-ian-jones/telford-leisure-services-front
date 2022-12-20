import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignUpService } from '../../sign-up/sign-up.service';
import { AccountRecoveryService } from '../account-recovery.service';
import { Email } from './../../../core/models/email';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {

  @ViewChild('errorSummaryDiv', {static: false}) errorSummaryDiv!: ElementRef;
  @Output() changeComponentEvent = new EventEmitter<any>();
  @Output() emitMemberEmailEvent = new EventEmitter<any>();
  emailForm!: FormGroup;
  errorSummary: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private accountRecoveryService: AccountRecoveryService
  ) { }

  ngOnInit() {
    this.initEmailForm();
  }

  initEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    this.errorSummary.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.emailForm.valid) {
      const email: Email = this.emailForm.value;
      this.sendConfirmationCodeEmail(email);
    } else {
      this.getAllFormValidationErrors();
    }
  }

  async sendConfirmationCodeEmail(email: Email) {
    try {
      let response: any = await lastValueFrom(this.accountRecoveryService.sendConfirmationCodeEmail(email));
      this.routeToNextStep();
    }
    catch
    {
      this.routeToNextStep()
    }
  }

  routeToNextStep() {
    this.emitMemberEmailEvent.emit(this.emailForm.controls['email'].value)
    this.changeComponentEvent.emit('email-code')
  }

  getAllFormValidationErrors() {
    Object.keys(this.emailForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.emailForm.get(control).errors;
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

}
