import {
  Component,
  computed,
  effect,
  ElementRef,
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
  FormGroup,
  Validators,
  FormControl
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
import { Subscription } from 'rxjs';
interface QuestionSixForm {
  ethnicity: FormControl<string | null>;
}

@Component({
  selector: 'app-question-six',
  templateUrl: './question-six.component.html',
  styleUrl: './question-six.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorSummaryComponent
  ]
})
export class QuestionSixComponent implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private subscription: Subscription;

  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @ViewChild('whiteInput', { static: false }) whiteInput: ElementRef;
  @ViewChild('asianInput', { static: false }) asianInput: ElementRef;
  @ViewChild('blackInput', { static: false }) blackInput: ElementRef;
  @ViewChild('chineseInput', { static: false }) chineseInput: ElementRef;
  @ViewChild('mixedInput', { static: false }) mixedInput: ElementRef;
  @ViewChild('otherInput', { static: false }) otherInput: ElementRef;

  currentPage = input.required<number>();
  totalPages = input.required<number>();
  newMemberData = input.required<Member>();

  form = signal<FormGroup<QuestionSixForm>>(this.initForm());
  formValid = signal<boolean>(false);
  errors = signal<ErrorSummaryItem[]>([]);
  hasErrors = computed(() => this.errors().length > 0);

  @Output() answerSixEvent = new EventEmitter<any>();

  constructor() {
    effect(() => {
      const memberData = this.newMemberData();
      if (memberData?.ethnicity) {
        this.form().patchValue({
          ethnicity: memberData.ethnicity
        });
        this.formValid.set(this.form().valid);
      }

      this.subscription = this.form().statusChanges.subscribe((status) => {
        this.formValid.set(status === 'VALID');
      });
    });
  }

  private initForm(): FormGroup<QuestionSixForm> {
    return this.formBuilder.group({
      ethnicity: ['', [Validators.required]]
    });
  }

  selectInput(value: string) {
    this.form().controls['ethnicity'].setValue(value);
    this.errors.set([]);

    const elementMap: { [key: string]: ElementRef | undefined } = {
      'White UK/Irish/Euro': this.whiteInput,
      'Asian/Asian British': this.asianInput,
      'Black/Black British': this.blackInput,
      Chinese: this.chineseInput,
      'Mixed/Dual': this.mixedInput,
      'Other/Not Stated': this.otherInput
    };

    const element = elementMap[value] || this.whiteInput;
    setTimeout(() => element?.nativeElement.focus());
  }

  onClickContinue() {
    if (this.form().valid) {
      this.answerSixEvent.emit(this.form().value);
    } else {
      this.handleFormValidationErrors();
    }
  }

  private handleFormValidationErrors(): void {
    const newErrors: ErrorSummaryItem[] = [];
    const controls = this.form().controls;

    Object.keys(controls).forEach((controlName) => {
      const control = controls[controlName as keyof QuestionSixForm];
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
