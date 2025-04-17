import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../auth/sign-up/sign-up.service';
import { Feedback } from '../core/models/feedback';
import { FeedbackService } from './feedback.service';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from '../core/constants/form-errors';
import { ErrorSummaryComponent } from '../shared/error-summary/error-summary.component';

interface SatisfactionForm {
  satisfaction: FormControl<string | null>;
  improvements: FormControl<string | null>;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorSummaryComponent
  ]
})
export default class FeedbackComponent implements OnInit {
  @ViewChild('verySatisfiedInput', { static: false })
  verySatisfiedInput: ElementRef;
  @ViewChild('satisfiedInput', { static: false }) satisfiedInput: ElementRef;
  @ViewChild('neitherInput', { static: false }) neitherInput: ElementRef;
  @ViewChild('dissatisfiedInput', { static: false })
  dissatisfiedInput: ElementRef;
  @ViewChild('veryDissatisfiedInput', { static: false })
  veryDissatisfiedInput: ElementRef;
  @ViewChild('otherInput', { static: false }) otherInput: ElementRef;
  satisfactionForm!: FormGroup;
  remainingCharacters: number = 1200;
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  errors: ErrorSummaryItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initSatisfactionForm();
  }

  initSatisfactionForm() {
    this.satisfactionForm = this.formBuilder.group<SatisfactionForm>({
      satisfaction: new FormControl('', {
        nonNullable: false,
        validators: [Validators.required]
      }),
      improvements: new FormControl('', {
        nonNullable: false,
        validators: [Validators.maxLength(1200)]
      })
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
    this.errors.length = 0;

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
    this.errors.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.satisfactionForm.valid) {
      this.createNewFeedback(this.satisfactionForm.value);
    } else {
      this.handleFormValidationErrors();
    }
  }

  async createNewFeedback(feedback: Feedback) {
    try {
      let response: any = await lastValueFrom(
        this.feedbackService.createNewFeedback(feedback)
      );
      this.router.navigateByUrl('/feedback/success');
    } catch {
      this.satisfactionForm.controls['satisfaction'].setErrors({
        required: true
      });
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.satisfactionForm.controls).forEach((control) => {
      const controlErrors = this.satisfactionForm.get(control)?.errors;
      if (!controlErrors) return;

      const controlErrorMessages = ERROR_MESSAGES[control];
      if (!controlErrorMessages) return;

      Object.keys(controlErrors).forEach((errorType) => {
        if (controlErrorMessages[errorType]) {
          newErrors.push(controlErrorMessages[errorType]);
        }
      });
    });

    this.errors = newErrors;
    setTimeout(() => this.errorSummary.focusErrorSummary());
  }

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }
}
