import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild
} from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from '../core/constants/form-errors';
import { ErrorSummaryComponent } from './../shared/components/error-summary/error-summary.component';
import { RemainingCharactersPipe } from '../shared/pipes/remaining-characters.pipe';
import { BusyButtonDirective } from '../shared/directives/busy-button.directive';
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
    ErrorSummaryComponent,
    RemainingCharactersPipe,
    BusyButtonDirective
  ]
})
export default class FeedbackComponent {
  private readonly router = inject(Router);
  private readonly signUpService = inject(SignUpService);
  private readonly feedbackService = inject(FeedbackService);
  private readonly formBuilder = inject(FormBuilder);

  @ViewChild('verySatisfiedInput', { static: false })
  verySatisfiedInput: ElementRef;
  @ViewChild('satisfiedInput', { static: false }) satisfiedInput: ElementRef;
  @ViewChild('neitherInput', { static: false }) neitherInput: ElementRef;
  @ViewChild('dissatisfiedInput', { static: false })
  dissatisfiedInput: ElementRef;
  @ViewChild('veryDissatisfiedInput', { static: false })
  veryDissatisfiedInput: ElementRef;
  @ViewChild('otherInput', { static: false }) otherInput: ElementRef;
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;

  readonly MAX_FEEDBACK_LENGTH = 1200;

  form = signal<FormGroup<SatisfactionForm>>(this.initForm());
  errors = signal<ErrorSummaryItem[]>([]);
  hasErrors = computed(() => this.errors().length > 0);

  satisfactionErrors = computed(
    () => this.form().get('satisfaction')?.errors && this.hasErrors()
  );

  improvementsErrors = computed(
    () => this.form().get('improvements')?.errors && this.hasErrors()
  );

  readonly isLoading = computed(() =>
    this.feedbackService.createFeedbackResource.isLoading()
  );

  constructor() {
    effect(() => {
      const feedbackResource = this.feedbackService.createFeedbackResource;

      const error = feedbackResource.error();
      if (error) {
        this.form().controls['satisfaction'].setErrors({
          required: true
        });
        this.handleFormValidationErrors();
        return;
      }

      const result = feedbackResource.value();
      if (result) {
        this.router.navigateByUrl('/feedback/success');
        this.feedbackService.setFeedbackData(undefined);
      }
    });
  }

  private initForm(): FormGroup<SatisfactionForm> {
    return this.formBuilder.group<SatisfactionForm>({
      satisfaction: new FormControl('', {
        nonNullable: false,
        validators: [Validators.required]
      }),
      improvements: new FormControl('', {
        nonNullable: false,
        validators: [Validators.maxLength(1200)]
      })
    });
  }

  selectInput(value: string) {
    this.form().controls['satisfaction'].setValue(value);
    this.errors.set([]);

    const elementMap: { [key: string]: ElementRef | undefined } = {
      'Very satisfied': this.verySatisfiedInput,
      Satisfied: this.satisfiedInput,
      'Neither satisfied or dissatisfied': this.neitherInput,
      Dissatisfied: this.dissatisfiedInput,
      'Very dissatisfied': this.veryDissatisfiedInput
    };

    const element = elementMap[value] || this.verySatisfiedInput;
    setTimeout(() => element?.nativeElement.focus());
  }

  onClickSendFeedback() {
    this.errors.set([]);
    this.signUpService.removeHashPathFromCurrentPath();

    if (this.form().valid) {
      if (this.isLoading()) {
        return;
      }

      const feedback: Feedback = {
        satisfaction: this.form().value.satisfaction!,
        improvements: this.form().value.improvements ?? ''
      };
      this.feedbackService.setFeedbackData(feedback);
    } else {
      this.handleFormValidationErrors();
    }
  }

  private handleFormValidationErrors() {
    const newErrors: ErrorSummaryItem[] = [];
    const controls = this.form().controls;

    Object.keys(controls).forEach((controlName) => {
      const controlErrors = this.form().get(controlName)?.errors;
      if (!controlErrors) return;

      const controlErrorMessages = ERROR_MESSAGES[controlName];
      if (!controlErrorMessages) return;

      Object.keys(controlErrors).forEach((errorType) => {
        if (controlErrorMessages[errorType]) {
          newErrors.push(controlErrorMessages[errorType]);
        }
      });
    });

    this.errors.set(newErrors);
    setTimeout(() => this.errorSummary.focusErrorSummary());
  }

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    element?.focus();
  }
}
