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
interface QuestionSevenForm {
  mainCenter: FormControl<string | null>;
}

@Component({
  selector: 'app-question-seven',
  templateUrl: './question-seven.component.html',
  styleUrl: './question-seven.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorSummaryComponent
  ]
})
export class QuestionSevenComponent implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private subscription: Subscription;

  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @ViewChild('abrahamInput', { static: false }) abrahamInput: ElementRef;
  @ViewChild('horsehayInput', { static: false }) horsehayInput: ElementRef;
  @ViewChild('newportInput', { static: false }) newportInput: ElementRef;
  @ViewChild('oakengatesInput', { static: false }) oakengatesInput: ElementRef;
  @ViewChild('phoenixInput', { static: false }) phoenixInput: ElementRef;
  @ViewChild('stirchleyInput', { static: false }) stirchleyInput: ElementRef;
  @ViewChild('wellingtonInput', { static: false }) wellingtonInput: ElementRef;

  currentPage = input.required<number>();
  totalPages = input.required<number>();
  newMemberData = input.required<Member>();

  form = signal<FormGroup<QuestionSevenForm>>(this.initForm());
  formValid = signal<boolean>(false);
  errors = signal<ErrorSummaryItem[]>([]);
  hasErrors = computed(() => this.errors().length > 0);

  mainCenterErrors = computed(
    () => this.form().get('mainCenter')?.errors && this.hasErrors()
  );

  @Output() answerSevenEvent = new EventEmitter<any>();

  constructor() {
    effect(() => {
      const memberData = this.newMemberData();
      if (memberData?.mainCenter) {
        this.form().patchValue({
          mainCenter: memberData.mainCenter
        });
        this.formValid.set(this.form().valid);
      }

      this.subscription = this.form().statusChanges.subscribe((status) => {
        this.formValid.set(status === 'VALID');
      });
    });
  }

  private initForm(): FormGroup<QuestionSevenForm> {
    return this.formBuilder.group({
      mainCenter: ['', [Validators.required]]
    });
  }

  selectInput(value: string) {
    this.form().controls['mainCenter'].setValue(value);
    this.errors.set([]);

    const elementMap: { [key: string]: ElementRef | undefined } = {
      'Abraham Darby Sports and Leisure Center': this.abrahamInput,
      'Horsehay Village Golf Club': this.horsehayInput,
      'Newport Swimming Pool': this.newportInput,
      'Oakengates Leisure Centre': this.oakengatesInput,
      'Phoenix Sports and Leisure Centre': this.phoenixInput,
      'Stirchley Recreation Center': this.stirchleyInput,
      'Wellington Civic and Leisure Centre': this.wellingtonInput
    };

    const element = elementMap[value] || this.abrahamInput;
    setTimeout(() => element?.nativeElement.focus());
  }

  onClickContinue() {
    if (this.form().valid) {
      this.answerSevenEvent.emit(this.form().value);
    } else {
      this.handleFormValidationErrors();
    }
  }

  private handleFormValidationErrors(): void {
    const newErrors: ErrorSummaryItem[] = [];
    const controls = this.form().controls;

    Object.keys(controls).forEach((controlName) => {
      const control = controls[controlName as keyof QuestionSevenForm];
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

  onClickMainCenterRequiredError() {
    setTimeout(() => this.abrahamInput.nativeElement.focus());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
