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
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from 'src/app/core/constants/form-errors';
import { ErrorSummaryComponent } from 'src/app/shared/error-summary/error-summary.component';
interface QuestionFourForm {
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
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
export class QuestionFourComponent implements OnInit {
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  questionFourForm!: FormGroup<QuestionFourForm>;
  @Output() answerFourEvent = new EventEmitter<any>();
  errors: ErrorSummaryItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService
  ) {}

  ngOnInit() {
    this.initQuestionFourForm();
  }

  initQuestionFourForm() {
    this.questionFourForm = this.formBuilder.group<QuestionFourForm>(
      {
        email: new FormControl(this.newMemberData.email, {
          nonNullable: false,
          validators: [Validators.required, Validators.email]
        }),
        phone: new FormControl(this.newMemberData.phone, {
          nonNullable: false,
          validators: [Validators.pattern('[- +()0-9]+')]
        })
      },
      { updateOn: 'submit' }
    );
  }

  onClickContinue() {
    this.errors.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.questionFourForm.valid) {
      this.answerFourEvent.emit(this.questionFourForm.value);
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.questionFourForm.controls).forEach((control) => {
      const controlErrors = this.questionFourForm.get(control)?.errors;
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
