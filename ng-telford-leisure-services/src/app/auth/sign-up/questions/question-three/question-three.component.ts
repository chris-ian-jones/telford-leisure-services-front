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
  Validators
} from '@angular/forms';
import { Member } from './../../../../core/models/member';

@Component({
  selector: 'app-question-three',
  templateUrl: './question-three.component.html',
  styleUrls: ['./question-three.component.scss']
})
export class QuestionThreeComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  @Output() answerThreeEvent = new EventEmitter<any>();
  questionThreeForm!: FormGroup;
  @ViewChild('maleInput', { static: false }) maleInput: ElementRef;
  @ViewChild('femaleInput', { static: false }) femaleInput: ElementRef;
  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;
  errorSummary: any = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initQuestionThreeForm();
  }

  initQuestionThreeForm() {
    this.questionThreeForm = this.formBuilder.group({
      gender: [this.newMemberData.gender, [Validators.required]]
    });
  }

  selectInput(value: string) {
    this.questionThreeForm.controls['gender'].setValue(value);
    this.errorSummary.length = 0;
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
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionThreeForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.questionThreeForm.get(control).errors;
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

  onClickGenderRequiredError() {
    setTimeout(() => this.maleInput.nativeElement.focus());
  }
}
