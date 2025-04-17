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
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorSummaryComponent } from 'src/app/shared/error-summary/error-summary.component';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from 'src/app/core/constants/form-errors';
interface QuestionTwoForm {
  day: FormControl<string | null>;
  month: FormControl<string | null>;
  year: FormControl<string | null>;
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
export class QuestionTwoComponent implements OnInit {
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  questionTwoForm!: FormGroup;
  errors: ErrorSummaryItem[] = [];
  @Output() answerTwoEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.initQuestionTwoForm();
  }

  initQuestionTwoForm() {
    this.questionTwoForm = this.formBuilder.group<QuestionTwoForm>(
      {
        day: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required, Validators.pattern('^[0-9]*$')]
        }),
        month: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required, Validators.pattern('^[0-9]*$')]
        }),
        year: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required, Validators.pattern('^[0-9]*$')]
        })
      },
      { updateOn: 'submit' }
    );

    if (this.newMemberData.dateOfBirth) {
      const dateOfBirth = new Date(this.newMemberData.dateOfBirth);
      const dayOfBirth = dateOfBirth.getDate();
      const monthOfBirth = dateOfBirth.getMonth() + 1;
      const yearOfBirth = dateOfBirth.getFullYear();

      this.questionTwoForm.patchValue({
        day: dayOfBirth,
        month: monthOfBirth,
        year: yearOfBirth
      });
    }
  }

  onClickContinue() {
    if (this.questionTwoForm.valid) {
      this.signUpService.removeHashPathFromCurrentPath();
      const day = this.questionTwoForm.get('day').value;
      const month = this.questionTwoForm.get('month').value;
      const year = this.questionTwoForm.get('year').value;
      const dateString = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;

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
        this.questionTwoForm.controls['day'].setErrors({ invalid: true });
        this.handleFormValidationErrors();
      }
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.questionTwoForm.controls).forEach((control) => {
      const controlErrors = this.questionTwoForm.get(control)?.errors;
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
