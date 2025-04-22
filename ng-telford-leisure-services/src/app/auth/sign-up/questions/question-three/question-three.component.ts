import {
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  input,
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
import { Member } from './../../../../core/models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from './../../../../core/constants/form-errors';
import { ErrorSummaryComponent } from './../../../../shared/components/error-summary/error-summary.component';

interface QuestionThreeForm {
  gender: FormControl<string>;
}

@Component({
  selector: 'app-question-three',
  templateUrl: './question-three.component.html',
  styleUrl: './question-three.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorSummaryComponent
  ]
})
export class QuestionThreeComponent {
  @ViewChild('maleInput', { static: false }) maleInput: ElementRef;
  @ViewChild('femaleInput', { static: false }) femaleInput: ElementRef;
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;

  currentPage = input.required<number>();
  totalPages = input.required<number>();
  newMemberData = input.required<Member>();

  genderValue = signal<string>('');

  form = signal<FormGroup<QuestionThreeForm>>(this.initForm());
  formValid = signal<boolean>(false);
  errors = signal<ErrorSummaryItem[]>([]);

  hasGenderError = computed(() => {
    const control = this.form().get('gender');
    return (
      control?.errors &&
      control?.hasError('required') &&
      this.errors().length > 0
    );
  });

  isFormValid = computed(() => this.formValid());

  @Output() answerThreeEvent = new EventEmitter<Partial<Member>>();

  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    effect(() => {
      const memberData = this.newMemberData();
      if (memberData) {
        this.form().patchValue({
          gender: memberData.gender || ''
        });
        this.formValid.set(this.form().valid);
      }
    });

    this.form()
      .get('gender')
      ?.valueChanges.subscribe((value) => {
        this.genderValue.set(value || '');
      });

    this.form().statusChanges.subscribe((status) => {
      this.formValid.set(status === 'VALID');
    });
  }

  private initForm(): FormGroup<QuestionThreeForm> {
    return this.formBuilder.group({
      gender: ['', [Validators.required]]
    });
  }

  selectInput(value: string) {
    const control = this.form().get('gender');
    if (control) {
      control.setValue(value, { emitEvent: true });
      control.markAsDirty();
      if (value === 'Male') {
        setTimeout(() => this.maleInput?.nativeElement.focus());
      } else if (value === 'Female') {
        setTimeout(() => this.femaleInput?.nativeElement.focus());
      }
    }
    this.errors.set([]);
  }

  onClickContinue() {
    if (this.isFormValid()) {
      this.answerThreeEvent.emit({
        gender: this.form().get('gender')?.value
      });
    } else {
      this.handleFormValidationErrors();
    }
  }

  private handleFormValidationErrors() {
    const newErrors: ErrorSummaryItem[] = [];
    const controls = this.form().controls;

    Object.keys(controls).forEach((controlName) => {
      const control = controls[controlName as keyof QuestionThreeForm];
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
