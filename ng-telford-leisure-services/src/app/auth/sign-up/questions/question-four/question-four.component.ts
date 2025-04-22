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
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from './../../../../core/constants/form-errors';
import { ErrorSummaryComponent } from './../../../../shared/components/error-summary/error-summary.component';
import { Subscription } from 'rxjs';

interface QuestionFourForm {
  email: FormControl<string>;
  phone: FormControl<string>;
}

@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.component.html',
  styleUrl: './question-four.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorSummaryComponent
  ]
})
export class QuestionFourComponent implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly signUpService = inject(SignUpService);
  private subscription: Subscription;

  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;

  currentPage = input.required<number>();
  totalPages = input.required<number>();
  newMemberData = input.required<Member>();

  form = signal<FormGroup<QuestionFourForm>>(this.initForm());
  formValid = signal<boolean>(false);
  errors = signal<ErrorSummaryItem[]>([]);
  hasErrors = computed(() => this.errors().length > 0);

  emailErrors = computed(
    () => this.form().get('email')?.errors && this.hasErrors()
  );

  phoneErrors = computed(
    () => this.form().get('phone')?.errors && this.hasErrors()
  );

  @Output() answerFourEvent = new EventEmitter<Partial<Member>>();

  constructor() {
    effect(() => {
      const memberData = this.newMemberData();
      if (memberData?.email || memberData?.phone) {
        this.form().patchValue({
          email: memberData.email || '',
          phone: memberData.phone || ''
        });
        this.formValid.set(this.form().valid);
      }

      this.subscription = this.form().statusChanges.subscribe((status) => {
        this.formValid.set(status === 'VALID');
      });
    });
  }

  private initForm(): FormGroup<QuestionFourForm> {
    return this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]]
      },
      { updateOn: 'submit' }
    );
  }

  onClickContinue(): void {
    this.errors.set([]);
    this.signUpService.removeHashPathFromCurrentPath();

    if (this.form().valid) {
      const { email, phone } = this.form().getRawValue();
      this.answerFourEvent.emit({ email, phone });
    } else {
      this.handleFormValidationErrors();
    }
  }

  private handleFormValidationErrors(): void {
    const newErrors: ErrorSummaryItem[] = [];
    const controls = this.form().controls;

    Object.keys(controls).forEach((controlName) => {
      const control = controls[controlName as keyof QuestionFourForm];
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
