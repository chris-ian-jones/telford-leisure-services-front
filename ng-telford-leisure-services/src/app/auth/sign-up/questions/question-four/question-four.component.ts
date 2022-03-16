import { Location } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.component.html',
  styleUrls: ['./question-four.component.scss']
})
export class QuestionFourComponent implements OnInit {

  @ViewChild('errorSummary', {static: false}) errorSummaryDiv!: ElementRef;
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  questionFourForm!: FormGroup;
  @Output() answerFourEvent = new EventEmitter<any>();
  errorSummary: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    this.initQuestionFourForm();
  }

  initQuestionFourForm() {
    this.questionFourForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('[- +()0-9]+')],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    console.log('this.questionFourForm: ', this.questionFourForm)
    this.errorSummary.length = 0;
    this.removeHashPathFromCurrentPath();
    if (this.questionFourForm.valid) {
      const answerFourObj = {
        email: '',
        phone: ''
      };
      answerFourObj.email = this.questionFourForm.get('email').value;
      answerFourObj.phone = this.questionFourForm.get('phone').value;
      this.answerFourEvent.emit(answerFourObj)
    } else {
      this.getAllFormValidationErrors();
    }
  }

  removeHashPathFromCurrentPath() {
    const pathWithoutHash = this.location.path(false);
    this.location.replaceState(pathWithoutHash);
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionFourForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.questionFourForm.get(control).errors;
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
