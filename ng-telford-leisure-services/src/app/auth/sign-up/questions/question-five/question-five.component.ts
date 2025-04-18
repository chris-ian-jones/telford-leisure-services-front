import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
export class QuestionFiveComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  @Output() answerFiveEvent = new EventEmitter<any>();
  questionFiveForm!: FormGroup<QuestionFiveForm>;
  errors: ErrorSummaryItem[] = [];
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService
  ) {}

  ngOnInit() {
    this.initQuestionFiveForm();
  }

  initQuestionFiveForm() {
    this.questionFiveForm = this.formBuilder.group<QuestionFiveForm>(
      {
        addressLineOne: new FormControl(this.newMemberData.addressLineOne, {
          nonNullable: false,
          validators: [Validators.required]
        }),
        addressLineTwo: new FormControl(this.newMemberData.addressLineTwo, {
          nonNullable: false
        }),
        townOrCity: new FormControl(this.newMemberData.townOrCity, {
          nonNullable: false
        }),
        county: new FormControl(this.newMemberData.county, {
          nonNullable: false
        }),
        postcode: new FormControl(this.newMemberData.postcode, {
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

  onClickContinue() {
    this.errors.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.questionFiveForm.valid) {
      this.answerFiveEvent.emit(this.questionFiveForm.value);
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.questionFiveForm.controls).forEach((control) => {
      const controlErrors = this.questionFiveForm.get(control)?.errors;
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
