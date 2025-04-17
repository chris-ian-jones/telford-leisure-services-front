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
  Validators
} from '@angular/forms';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorSummaryComponent } from 'src/app/shared/error-summary/error-summary.component';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from 'src/app/core/constants/form-errors';

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
export class QuestionOneComponent implements OnInit {
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  questionOneForm!: FormGroup<QuestionOneForm>;
  errors: ErrorSummaryItem[] = [];
  @Output() answerOneEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService
  ) {}

  ngOnInit() {
    this.initQuestionOneForm();
  }

  initQuestionOneForm() {
    this.questionOneForm = this.formBuilder.group<QuestionOneForm>(
      {
        firstName: new FormControl(this.newMemberData.firstName, {
          nonNullable: false,
          validators: [Validators.required]
        }),
        lastName: new FormControl(this.newMemberData.lastName, {
          nonNullable: false,
          validators: [Validators.required]
        })
      },
      { updateOn: 'submit' }
    );
  }

  onClickContinue() {
    this.errors.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.questionOneForm.valid) {
      this.answerOneEvent.emit(this.questionOneForm.value);
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.questionOneForm.controls).forEach((control) => {
      const controlErrors = this.questionOneForm.get(control)?.errors;
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
