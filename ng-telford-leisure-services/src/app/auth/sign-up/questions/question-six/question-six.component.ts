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
  ValidationErrors,
  Validators,
  FormControl
} from '@angular/forms';
import { Member } from './../../../../core/models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

interface QuestionSixForm {
  ethnicity: FormControl<string | null>;
}

@Component({
  selector: 'app-question-six',
  templateUrl: './question-six.component.html',
  styleUrl: './question-six.component.scss',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule]
})
export class QuestionSixComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  @Output() answerSixEvent = new EventEmitter<any>();
  @ViewChild('whiteInput', { static: false }) whiteInput: ElementRef;
  @ViewChild('asianInput', { static: false }) asianInput: ElementRef;
  @ViewChild('blackInput', { static: false }) blackInput: ElementRef;
  @ViewChild('chineseInput', { static: false }) chineseInput: ElementRef;
  @ViewChild('mixedInput', { static: false }) mixedInput: ElementRef;
  @ViewChild('otherInput', { static: false }) otherInput: ElementRef;
  questionSixForm!: FormGroup;
  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;
  errorSummary: any = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initQuestionSixForm();
  }

  initQuestionSixForm() {
    this.questionSixForm = this.formBuilder.group<QuestionSixForm>({
      ethnicity: new FormControl(this.newMemberData.ethnicity, {
        nonNullable: false,
        validators: [Validators.required]
      })
    });
  }

  selectInput(value: string) {
    this.questionSixForm.controls['ethnicity'].setValue(value);
    this.errorSummary.length = 0;

    switch (value) {
      case 'White UK/Irish/Euro': {
        setTimeout(() => this.whiteInput.nativeElement.focus());
        break;
      }
      case 'Asian/Asian British': {
        setTimeout(() => this.asianInput.nativeElement.focus());
        break;
      }
      case 'Black/Black British': {
        setTimeout(() => this.blackInput.nativeElement.focus());
        break;
      }
      case 'Chinese': {
        setTimeout(() => this.chineseInput.nativeElement.focus());
        break;
      }
      case 'Mixed/Dual': {
        setTimeout(() => this.mixedInput.nativeElement.focus());
        break;
      }
      case 'Other/Not Stated': {
        setTimeout(() => this.otherInput.nativeElement.focus());
        break;
      }
      default: {
        setTimeout(() => this.whiteInput.nativeElement.focus());
        break;
      }
    }
  }

  onClickContinue() {
    if (this.questionSixForm.valid) {
      this.answerSixEvent.emit(this.questionSixForm.value);
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionSixForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.questionSixForm.get(control).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((error) => {
          this.errorSummary.push({
            control,
            error
          });
        });
        setTimeout(() => this.errorSummaryDiv.nativeElement.focus());
      }
    });
  }

  onClickEthnicityRequiredError() {
    setTimeout(() => this.whiteInput.nativeElement.focus());
  }
}
