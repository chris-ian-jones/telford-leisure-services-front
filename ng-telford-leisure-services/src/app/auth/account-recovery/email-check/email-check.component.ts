import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.scss']
})
export class EmailCheckComponent implements OnInit {

  @ViewChild('yesInput', {static: false}) yesInput: ElementRef;
  @ViewChild('noInput', {static: false}) noInput: ElementRef;
  @Output() changeComponentEvent = new EventEmitter<any>();
  emailCheckForm!: FormGroup;
  @ViewChild('errorSummaryDiv', {static: false}) errorSummaryDiv!: ElementRef;
  errorSummary: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initEmailCheckForm();
  }

  initEmailCheckForm() {
    this.emailCheckForm = this.formBuilder.group({
      emailCheck: ['', [Validators.required]],
    })
  }

  selectInput(value:string) {
    this.emailCheckForm.controls['emailCheck'].setValue(value)
    this.errorSummary.length = 0;
    
    switch(value) {
      case 'Yes': {
        setTimeout(() => this.yesInput.nativeElement.focus());
        break;
      }
      case 'No': {
        setTimeout(() => this.noInput.nativeElement.focus());
        break;
      }
      default: {
        setTimeout(() => this.yesInput.nativeElement.focus());
        break;
      } 
    }
  }

  onClickContinue() {
    this.errorSummary.length = 0;
    if (this.emailCheckForm.valid) {
      if (this.emailCheckForm.controls['emailCheck'].value === 'Yes') {
        this.router.navigateByUrl('/sign-in')
      } else {
        this.changeComponentEvent.emit('email-confirm')
      }
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.emailCheckForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.emailCheckForm.get(control).errors;
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

  onClickEmailCheckError() {
    setTimeout(() => this.yesInput.nativeElement.focus());
  }

}
