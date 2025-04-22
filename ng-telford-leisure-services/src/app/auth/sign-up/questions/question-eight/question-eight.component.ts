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
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Member } from './../../../../core/models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from './../../../../core/constants/form-errors';
import { ErrorSummaryComponent } from './../../../../shared/components/error-summary/error-summary.component';
interface QuestionEightForm {
  membershipType: FormControl<string>;
}

@Component({
  selector: 'app-question-eight',
  templateUrl: './question-eight.component.html',
  styleUrl: './question-eight.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorSummaryComponent
  ]
})
export class QuestionEightComponent {
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @ViewChild('adtInput', { static: false }) adtInput: ElementRef;
  @ViewChild('hcoInput', { static: false }) hcoInput: ElementRef;
  @ViewChild('haeInput', { static: false }) haeInput: ElementRef;
  @ViewChild('hccInput', { static: false }) hccInput: ElementRef;

  currentPage = input.required<number>();
  totalPages = input.required<number>();
  newMemberData = input.required<Member>();

  form = signal<FormGroup<QuestionEightForm>>(this.initForm());
  formValid = signal<boolean>(false);
  errors = signal<ErrorSummaryItem[]>([]);
  hasErrors = computed(() => this.errors().length > 0);

  @Output() answerEightEvent = new EventEmitter<any>();

  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    effect(() => {
      const memberData = this.newMemberData();
      if (memberData?.membershipType) {
        this.form().patchValue({
          membershipType: memberData.membershipType
        });
        this.formValid.set(this.form().valid);
      }

      this.form().statusChanges.subscribe((status) => {
        this.formValid.set(status === 'VALID');
      });
    });
  }

  private initForm(): FormGroup<QuestionEightForm> {
    return this.formBuilder.group<QuestionEightForm>({
      membershipType: new FormControl('', {
        nonNullable: false,
        validators: [Validators.required]
      })
    });
  }

  selectInput(value: string) {
    this.form().controls['membershipType'].setValue(value);
    this.errors.set([]);

    const elementMap: { [key: string]: ElementRef | undefined } = {
      'TLC Adt Resident 16+ - ADT': this.adtInput,
      'Annual Cash Concession - HCO': this.hcoInput,
      'Aspirations All Inclusive - HAE': this.haeInput,
      'Aspirations No Contract - HCC': this.hccInput
    };

    const element = elementMap[value] || this.adtInput;
    setTimeout(() => element?.nativeElement.focus());
  }

  onClickContinue(): void {
    if (this.form().valid) {
      this.answerEightEvent.emit(this.form().value);
    } else {
      this.handleFormValidationErrors();
    }
  }

  private handleFormValidationErrors(): void {
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.form().controls).forEach((control) => {
      const controlErrors = this.form().get(control)?.errors;
      if (!controlErrors) return;

      const controlErrorMessages = ERROR_MESSAGES[control];
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
