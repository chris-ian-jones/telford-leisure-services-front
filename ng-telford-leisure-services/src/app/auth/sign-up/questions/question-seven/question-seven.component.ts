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
  FormControl
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
export class QuestionSevenComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  @Output() answerSevenEvent = new EventEmitter<any>();
  @ViewChild('abrahamInput', { static: false }) abrahamInput: ElementRef;
  @ViewChild('horsehayInput', { static: false }) horsehayInput: ElementRef;
  @ViewChild('newportInput', { static: false }) newportInput: ElementRef;
  @ViewChild('oakengatesInput', { static: false }) oakengatesInput: ElementRef;
  @ViewChild('phoenixInput', { static: false }) phoenixInput: ElementRef;
  @ViewChild('stirchleyInput', { static: false }) stirchleyInput: ElementRef;
  @ViewChild('wellingtonInput', { static: false }) wellingtonInput: ElementRef;
  questionSevenForm!: FormGroup;
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  errors: ErrorSummaryItem[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initQuestionSevenForm();
  }

  initQuestionSevenForm() {
    this.questionSevenForm = this.formBuilder.group<QuestionSevenForm>({
      mainCenter: new FormControl(this.newMemberData.mainCenter, {
        nonNullable: false,
        validators: [Validators.required]
      })
    });
  }

  selectInput(value: string) {
    this.questionSevenForm.controls['mainCenter'].setValue(value);
    this.errors.length = 0;

    switch (value) {
      case 'Abraham Darby Sports and Leisure Center': {
        setTimeout(() => this.abrahamInput.nativeElement.focus());
        break;
      }
      case 'Horsehay Village Golf Club': {
        setTimeout(() => this.horsehayInput.nativeElement.focus());
        break;
      }
      case 'Newport Swimming Pool': {
        setTimeout(() => this.newportInput.nativeElement.focus());
        break;
      }
      case 'Oakengates Leisure Centre': {
        setTimeout(() => this.oakengatesInput.nativeElement.focus());
        break;
      }
      case 'Phoenix Sports and Leisure Centre': {
        setTimeout(() => this.phoenixInput.nativeElement.focus());
        break;
      }
      case 'Stirchley Recreation Center': {
        setTimeout(() => this.stirchleyInput.nativeElement.focus());
        break;
      }
      case 'Wellington Civic and Leisure Centre': {
        setTimeout(() => this.wellingtonInput.nativeElement.focus());
        break;
      }
      default: {
        setTimeout(() => this.abrahamInput.nativeElement.focus());
        break;
      }
    }
  }

  onClickContinue() {
    if (this.questionSevenForm.valid) {
      this.answerSevenEvent.emit(this.questionSevenForm.value);
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.questionSevenForm.controls).forEach((control) => {
      const controlErrors = this.questionSevenForm.get(control)?.errors;
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

  onClickMainCenterRequiredError() {
    setTimeout(() => this.abrahamInput.nativeElement.focus());
  }
}
