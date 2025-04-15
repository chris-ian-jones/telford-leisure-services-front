import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../auth/sign-up/sign-up.service';
import { Feedback } from '../core/models/feedback';
import { FeedbackService } from './feedback.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @ViewChild('verySatisfiedInput', { static: false })
  verySatisfiedInput: ElementRef;
  @ViewChild('satisfiedInput', { static: false }) satisfiedInput: ElementRef;
  @ViewChild('neitherInput', { static: false }) neitherInput: ElementRef;
  @ViewChild('dissatisfiedInput', { static: false })
  dissatisfiedInput: ElementRef;
  @ViewChild('veryDissatisfiedInput', { static: false })
  veryDissatisfiedInput: ElementRef;
  @ViewChild('otherInput', { static: false }) otherInput: ElementRef;
  satisfactionForm!: UntypedFormGroup;
  remainingCharacters: number = 1200;
  @ViewChild('errorSummaryDiv', { static: false }) errorSummaryDiv!: ElementRef;
  errorSummary: any = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private signUpService: SignUpService,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initSatisfactionForm();
  }

  initSatisfactionForm() {
    this.satisfactionForm = this.formBuilder.group({
      satisfaction: ['', [Validators.required]],
      improvements: ['', [Validators.maxLength(1200)]]
    });
    this.satisfactionForm
      .get('improvements')
      .valueChanges.subscribe((textString) => {
        const remainingCharactersConstant = 1200;
        this.remainingCharacters =
          remainingCharactersConstant - textString.length;
      });
  }

  selectInput(value: string) {
    this.satisfactionForm.controls['satisfaction'].setValue(value);
    this.errorSummary.length = 0;

    switch (value) {
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
      this.createNewFeedback(this.satisfactionForm.value);
    } else {
      this.getAllFormValidationErrors();
    }
  }

  async createNewFeedback(feedback: Feedback) {
    try {
      let response: any = await lastValueFrom(
        this.feedbackService.createNewFeedback(feedback)
      );
      this.router.navigateByUrl('feedback/success');
    } catch {
      this.satisfactionForm.controls['satisfaction'].setErrors({
        required: true
      });
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.satisfactionForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.satisfactionForm.get(control).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((error) => {
          this.errorSummary.push({
            control,
            error
          });
        });
        setTimeout(() => this.errorSummaryDiv.nativeElement.focus());
      }
    });
  }

  onClickSatisfactionError() {
    setTimeout(() => this.verySatisfiedInput.nativeElement.focus());
  }
}
