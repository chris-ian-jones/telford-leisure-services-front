import {
  Component,
  computed,
  effect,
  EventEmitter,
  input,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorSummaryComponent } from './../../../../shared/components/error-summary/error-summary.component';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from './../../../../core/constants/form-errors';
interface QuestionTwoForm {
  day: FormControl<string>;
  month: FormControl<string>;
  year: FormControl<string>;
}

@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.component.html',
  styleUrl: './question-two.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorSummaryComponent
  ],
  providers: [DatePipe]
})
export class QuestionTwoComponent {
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;

  currentPage = input.required<number>();
  totalPages = input.required<number>();
  newMemberData = input.required<Member>();

  form = signal<FormGroup<QuestionTwoForm>>(this.initForm());
  formValid = signal<boolean>(false);
  errors = signal<ErrorSummaryItem[]>([]);
  hasErrors = computed(() => this.errors().length > 0);

  dayErrors = computed(
    () => this.form().get('day')?.errors && this.hasErrors()
  );

  monthErrors = computed(
    () => this.form().get('month')?.errors && this.hasErrors()
  );

  yearErrors = computed(
    () => this.form().get('year')?.errors && this.hasErrors()
  );

  @Output() answerTwoEvent = new EventEmitter<Partial<Member>>();

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private datePipe: DatePipe
  ) {
    effect(() => {
      const memberData = this.newMemberData();
      if (memberData?.dateOfBirth) {
        const dateOfBirth = new Date(memberData.dateOfBirth);
        this.form().patchValue({
          day: dateOfBirth.getDate().toString(),
          month: (dateOfBirth.getMonth() + 1).toString(),
          year: dateOfBirth.getFullYear().toString()
        });
        this.formValid.set(this.form().valid);
      }

      this.form().statusChanges.subscribe((status) => {
        this.formValid.set(status === 'VALID');
      });
    });
  }

  private initForm(): FormGroup<QuestionTwoForm> {
    return this.formBuilder.group(
      {
        day: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        month: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
      },
      { updateOn: 'submit' }
    );
  }

  onClickContinue(): void {
    this.errors.set([]);
    this.signUpService.removeHashPathFromCurrentPath();

    if (this.form().valid) {
      const { day, month, year } = this.form().getRawValue();
      const dateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const dateOfBirth = new Date(dateString);

      const isValidDate =
        !isNaN(dateOfBirth.getTime()) &&
        dateOfBirth.getFullYear() === Number(year) &&
        dateOfBirth.getMonth() === Number(month) - 1 &&
        dateOfBirth.getDate() === Number(day);

      if (isValidDate) {
        this.answerTwoEvent.emit({
          dateOfBirth: this.datePipe.transform(dateOfBirth, 'yyyy-MM-dd')
        });
      } else {
        this.form().get('day')?.setErrors({ invalid: true });
        this.handleFormValidationErrors();
      }
    } else {
      this.handleFormValidationErrors();
    }
  }

  private handleFormValidationErrors(): void {
    const newErrors: ErrorSummaryItem[] = [];
    const controls = this.form().controls;

    Object.keys(controls).forEach((controlName) => {
      const control = controls[controlName as keyof QuestionTwoForm];
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
    if (element) {
      element.focus();
    }
  }
}
