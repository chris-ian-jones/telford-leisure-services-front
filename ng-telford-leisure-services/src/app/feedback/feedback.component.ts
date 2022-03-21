import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignUpService } from '../auth/sign-up/sign-up.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  @ViewChild('verySatisfiedInput', {static: false}) verySatisfiedInput: ElementRef;
  @ViewChild('satisfiedInput', {static: false}) satisfiedInput: ElementRef;
  @ViewChild('neitherInput', {static: false}) neitherInput: ElementRef;
  @ViewChild('dissatisfiedInput', {static: false}) dissatisfiedInput: ElementRef;
  @ViewChild('veryDissatisfiedInput', {static: false}) veryDissatisfiedInput: ElementRef;
  @ViewChild('otherInput', {static: false}) otherInput: ElementRef;
  satisfactionForm!: FormGroup;
  remainingCharacters: number = 1200;
  @ViewChild('errorSummary', {static: false}) errorSummaryDiv!: ElementRef;
  errorSummary: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService
  ) { }

  ngOnInit() {
    this.initSatisfactionForm();
  }

  initSatisfactionForm() {
    this.satisfactionForm = this.formBuilder.group({
      satisfaction: ['', [Validators.required]],
      improvements: ['', [Validators.max(1200)]]
    })
    this.satisfactionForm.get("improvements").valueChanges.subscribe(textString => {
      const remainingCharactersConstant = 1200
      this.remainingCharacters = remainingCharactersConstant - textString.length;
    })
  }

  selectInput(value:string) {
    this.satisfactionForm.controls['satisfaction'].setValue(value)

    switch(value) {
      case 'Very satisfied': {
        setTimeout(() => this.verySatisfiedInput.nativeElement.focus());
        break;
      }
      case 'Satisfied': {
        setTimeout(() => this.satisfiedInput.nativeElement.focus());
        break;
      }
      case 'Neither satisfied or dissatisfied': {
        setTimeout(() => this.neitherInput.nativeElement.focus());
        break;
      }
      case 'Dissatisfied': {
        setTimeout(() => this.dissatisfiedInput.nativeElement.focus());
        break;
      }
      case 'Very dissatisfied': {
        setTimeout(() => this.veryDissatisfiedInput.nativeElement.focus());
        break;
      }
      default: {
        setTimeout(() => this.verySatisfiedInput.nativeElement.focus());
        break;
      } 
    }
  }

  onClickSendFeedback() {
    this.errorSummary.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.satisfactionForm.valid) {
      console.log('this.satisfactionForm.valid: ', this.satisfactionForm.valid)
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.satisfactionForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.satisfactionForm.get(control).errors;
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

  onClickSatisfactionError() {
    setTimeout(() => this.verySatisfiedInput.nativeElement.focus());
  }

}
