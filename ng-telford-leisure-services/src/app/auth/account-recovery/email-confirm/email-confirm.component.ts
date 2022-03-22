import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignUpService } from '../../sign-up/sign-up.service';

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
      // todo backend call to generate and send code to email
      this.emitMemberEmailEvent.emit(this.emailForm.controls['email'].value)
      this.changeComponentEvent.emit('email-code')
    } else {
      this.getAllFormValidationErrors();
    }
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
