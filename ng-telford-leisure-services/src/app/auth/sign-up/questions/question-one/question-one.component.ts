import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-one',
  templateUrl: './question-one.component.html',
  styleUrls: ['./question-one.component.scss']
})
export class QuestionOneComponent implements OnInit {

  @ViewChild('errorSummary', {static: false}) errorSummaryDiv!: ElementRef;
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  questionOneForm!: FormGroup;
  errorSummary: any = [];
  @Output() answerOneEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initQuestionOneForm();
  }

  initQuestionOneForm() {
    this.questionOneForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    this.errorSummary.length = 0;
    if (this.questionOneForm.valid) {
      const answerOneObj = {
        firstName: '',
        lastName: ''
      };
      answerOneObj.firstName = this.questionOneForm.get('firstName').value;
      answerOneObj.lastName = this.questionOneForm.get('lastName').value;
      this.answerOneEvent.emit(answerOneObj)
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionOneForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.questionOneForm.get(control).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(error => {
          this.errorSummary.push(
            {
              control,
              error
            }
          )
        });
        setTimeout(() => this.errorSummaryDiv.nativeElement.focus())
      }
    });
  }

}
