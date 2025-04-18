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
  membershipType: FormControl<string | null>;
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
export class QuestionEightComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  @Output() answerEightEvent = new EventEmitter<any>();
  @ViewChild('adtInput', { static: false }) adtInput: ElementRef;
  @ViewChild('hcoInput', { static: false }) hcoInput: ElementRef;
  @ViewChild('haeInput', { static: false }) haeInput: ElementRef;
  @ViewChild('hccInput', { static: false }) hccInput: ElementRef;
  questionEightForm!: FormGroup<QuestionEightForm>;
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  errors: ErrorSummaryItem[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initQuestionEightForm();
  }

  initQuestionEightForm() {
    this.questionEightForm = this.formBuilder.group<QuestionEightForm>({
      membershipType: new FormControl('', {
        nonNullable: false,
        validators: [Validators.required]
      })
    });
  }

  selectInput(value: string) {
    this.questionEightForm.controls['membershipType'].setValue(value);
    this.errors.length = 0;

    switch (value) {
      case 'TLC Adt Resident 16+ - ADT': {
        setTimeout(() => this.adtInput.nativeElement.focus());
        break;
      }
      case 'Annual Cash Concession - HCO': {
        setTimeout(() => this.hcoInput.nativeElement.focus());
        break;
      }
      case 'Aspirations All Inclusive - HAE': {
        setTimeout(() => this.haeInput.nativeElement.focus());
        break;
      }
      case 'Aspirations No Contract - HCC': {
        setTimeout(() => this.hccInput.nativeElement.focus());
        break;
      }
      default: {
        setTimeout(() => this.adtInput.nativeElement.focus());
        break;
      }
    }
  }

  onClickContinue() {
    if (this.questionEightForm.valid) {
      this.answerEightEvent.emit(this.questionEightForm.value);
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.questionEightForm.controls).forEach((control) => {
      const controlErrors = this.questionEightForm.get(control)?.errors;
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
