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
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from './../../../../core/constants/form-errors';
import { ErrorSummaryComponent } from './../../../../shared/components/error-summary/error-summary.component';
import { Subscription } from 'rxjs';

interface QuestionFiveForm {
  addressLineOne: FormControl<string | null>;
  addressLineTwo: FormControl<string | null>;
  townOrCity: FormControl<string | null>;
  county: FormControl<string | null>;
  postcode: FormControl<string | null>;
}

@Component({
  selector: 'app-question-five',
  templateUrl: './question-five.component.html',
  styleUrl: './question-five.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorSummaryComponent
  ]
})
export class QuestionFiveComponent implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly signUpService = inject(SignUpService);
  private subscription: Subscription;

  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  newMemberData = input.required<Member>();

  form = signal<FormGroup<QuestionFiveForm>>(this.initForm());
  formValid = signal<boolean>(false);
  errors = signal<ErrorSummaryItem[]>([]);
  hasErrors = computed(() => this.errors().length > 0);

  @Output() answerFiveEvent = new EventEmitter<any>();

  constructor() {
    effect(() => {
      const memberData = this.newMemberData();
      if (memberData) {
        this.form().patchValue({
          addressLineOne: memberData.addressLineOne,
          addressLineTwo: memberData.addressLineTwo,
          townOrCity: memberData.townOrCity,
          county: memberData.county,
          postcode: memberData.postcode
        });
        this.formValid.set(this.form().valid);
      }

      this.subscription = this.form().statusChanges.subscribe((status) => {
        this.formValid.set(status === 'VALID');
      });
    });
  }

  private initForm(): FormGroup<QuestionFiveForm> {
    return this.formBuilder.group<QuestionFiveForm>(
      {
        addressLineOne: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required]
        }),
        addressLineTwo: new FormControl('', {
          nonNullable: false
        }),
        townOrCity: new FormControl('', {
          nonNullable: false
        }),
        county: new FormControl('', {
          nonNullable: false
        }),
        postcode: new FormControl('', {
          nonNullable: false,
          validators: [
            Validators.required,
            Validators.pattern(
              '^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$'
            )
          ]
        })
      },
      { updateOn: 'submit' }
    );
  }

  onClickContinue(): void {
    this.errors.set([]);
    this.signUpService.removeHashPathFromCurrentPath();

    if (this.form().valid) {
      this.answerFiveEvent.emit(this.form().value);
    } else {
      this.handleFormValidationErrors();
    }
  }

  private handleFormValidationErrors(): void {
    const newErrors: ErrorSummaryItem[] = [];
    const controls = this.form().controls;

    Object.keys(controls).forEach((controlName) => {
      const control = this.form().get(controlName);
      const controlErrors = control?.errors;

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
