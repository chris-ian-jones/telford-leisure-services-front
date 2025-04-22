import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  OnDestroy,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorSummaryComponent } from './../../../../shared/components/error-summary/error-summary.component';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from '../../../../core/constants/form-errors';
import { Subscription } from 'rxjs';

interface QuestionOneForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
}

@Component({
  selector: 'app-question-one',
  templateUrl: './question-one.component.html',
  styleUrl: './question-one.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorSummaryComponent
  ]
})
export class QuestionOneComponent implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly signUpService = inject(SignUpService);
  private subscription: Subscription;

  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  newMemberData = input.required<Member>();
  form = signal<FormGroup<QuestionOneForm>>(this.initForm());
  formValid = signal<boolean>(false);
  errors = signal<ErrorSummaryItem[]>([]);

  hasFirstNameError = computed(() => {
    const control = this.form().get('firstName');
    return (
      control?.errors &&
      control?.hasError('required') &&
      this.errors().length > 0
    );
  });

  hasLastNameError = computed(() => {
    const control = this.form().get('lastName');
    return (
      control?.errors &&
      control?.hasError('required') &&
      this.errors().length > 0
    );
  });

  isFormValid = computed(() => this.formValid());

  @Output() answerOneEvent = new EventEmitter<Partial<Member>>();

  constructor() {
    effect(() => {
      const memberData = this.newMemberData();
      if (memberData) {
        this.form().patchValue({
          firstName: memberData.firstName || '',
          lastName: memberData.lastName || ''
        });
        this.formValid.set(this.form().valid);
      }
    });

    this.subscription = this.form().statusChanges.subscribe((status) => {
      this.formValid.set(status === 'VALID');
    });
  }

  private initForm(): FormGroup<QuestionOneForm> {
    return this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]]
      },
      { updateOn: 'submit' }
    );
  }

  onClickContinue() {
    this.errors.set([]);
    this.signUpService.removeHashPathFromCurrentPath();

    if (this.isFormValid()) {
      const formValue = this.form().getRawValue();
      this.answerOneEvent.emit(formValue);
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    const newErrors: ErrorSummaryItem[] = [];
    const controls = this.form().controls;

    Object.keys(controls).forEach((controlName) => {
      const control = controls[controlName as keyof QuestionOneForm];
      const controlErrors = control.errors;

      if (controlErrors) {
        const errorMessages = ERROR_MESSAGES[controlName];
        if (errorMessages) {
          Object.keys(controlErrors).forEach((errorType) => {
            if (errorMessages[errorType]) {
              newErrors.push(errorMessages[errorType]);
            }
          });
        }
      }
    });

    this.errors.set(newErrors);
    setTimeout(() => this.errorSummary.focusErrorSummary());
  }

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    element?.focus();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
