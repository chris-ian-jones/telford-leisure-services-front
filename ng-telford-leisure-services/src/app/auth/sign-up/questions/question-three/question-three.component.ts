import {
  Component,
  ElementRef,
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
import { Member } from './../../../../core/models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from 'src/app/core/constants/form-errors';
import { ErrorSummaryComponent } from 'src/app/shared/error-summary/error-summary.component';

interface QuestionThreeForm {
  gender: FormControl<string | null>;
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
export class QuestionThreeComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  @Output() answerThreeEvent = new EventEmitter<any>();
  questionThreeForm!: FormGroup;
  @ViewChild('maleInput', { static: false }) maleInput: ElementRef;
  @ViewChild('femaleInput', { static: false }) femaleInput: ElementRef;
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  errors: ErrorSummaryItem[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initQuestionThreeForm();
  }

  initQuestionThreeForm() {
    this.questionThreeForm = this.formBuilder.group<QuestionThreeForm>({
      gender: new FormControl(this.newMemberData.gender, {
        nonNullable: false,
        validators: [Validators.required]
      })
    });
  }

  selectInput(value: string) {
    this.questionThreeForm.controls['gender'].setValue(value);
    this.errors.length = 0;
    if (value === 'Male') {
      setTimeout(() => this.maleInput.nativeElement.focus());
    } else if (value === 'Female') {
      setTimeout(() => this.femaleInput.nativeElement.focus());
    }
  }

  onClickContinue() {
    if (this.questionThreeForm.valid) {
      this.answerThreeEvent.emit({
        gender: this.questionThreeForm.controls['gender'].value
      });
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.questionThreeForm.controls).forEach((control) => {
      const controlErrors = this.questionThreeForm.get(control)?.errors;
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
