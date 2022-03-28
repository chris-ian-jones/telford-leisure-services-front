import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignUpService } from '../../sign-up/sign-up.service';
import { AccountRecoveryService } from '../account-recovery.service';

@Component({
  selector: 'app-email-code',
  templateUrl: './email-code.component.html',
  styleUrls: ['./email-code.component.scss']
})
export class EmailCodeComponent implements OnInit {

  @ViewChild('errorSummaryDiv', {static: false}) errorSummaryDiv!: ElementRef;
  @Input() memberEmail!: string;
  @Input() path: string;
  @Output() changeComponentEvent = new EventEmitter<any>();
  @Output() emitMemberNumberEvent = new EventEmitter<any>();
  @Output() emitConfirmationCodeEvent = new EventEmitter<any>();
  confirmationCodeForm!: FormGroup;
  errorSummary: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private accountRecoveryService: AccountRecoveryService

  ) { }

  ngOnInit() {
    this.initConfirmationCodeForm();
  }

  initConfirmationCodeForm() {
    this.confirmationCodeForm = this.formBuilder.group({
      confirmationCode: ['', Validators.required],
    }, {updateOn: 'submit'})
  }

  onClickConfirm() {
    this.errorSummary.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.confirmationCodeForm.valid) {
      const payload = {
        email: this.memberEmail,
        confirmationCode: this.confirmationCodeForm.controls['confirmationCode'].value,
      }
      if (this.path === 'forgot-member-number') {
        this.accountRecoveryService.forgotMemberNumber(payload).subscribe((response:any) => {
          this.emitMemberNumberEvent.emit(response.body.memberNumber)
          this.changeComponentEvent.emit('member-number-recovered')
        }, error => {
          this.confirmationCodeForm.controls['confirmationCode'].setErrors({'incorrect': true})
          this.getAllFormValidationErrors();
        })
      } else {
        this.accountRecoveryService.validateConfirmationCode(payload).subscribe((response:any) => {
          this.emitConfirmationCodeEvent.emit(this.confirmationCodeForm.controls['confirmationCode'].value)
          this.changeComponentEvent.emit('change-password')
        }, error => {
          this.confirmationCodeForm.controls['confirmationCode'].setErrors({'incorrect': true})
          this.getAllFormValidationErrors();
        })
      }
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.confirmationCodeForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.confirmationCodeForm.get(control).errors;
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

  onClickBack() {
    this.changeComponentEvent.emit('email-confirm')
  }

  onClickStartAgain() {
    this.changeComponentEvent.emit('email-check')
  }

}
