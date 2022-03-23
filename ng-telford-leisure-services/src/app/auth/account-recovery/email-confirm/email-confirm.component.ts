import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignUpService } from '../../sign-up/sign-up.service';
import { AccountRecoveryService } from '../account-recovery.service';

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
      this.accountRecoveryService.sendConfirmationCodeEmail(this.emailForm.value).subscribe(response => {
        this.routeToNextStep();
      }, error => {
        this.routeToNextStep()
      });
    } else {
      this.getAllFormValidationErrors();
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
