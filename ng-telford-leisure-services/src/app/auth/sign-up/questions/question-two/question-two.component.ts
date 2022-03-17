import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment'
import { SignUpService } from '../../sign-up.service';
@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.component.html',
  styleUrls: ['./question-two.component.scss']
})
export class QuestionTwoComponent implements OnInit {

  @ViewChild('errorSummary', {static: false}) errorSummaryDiv!: ElementRef;
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  questionTwoForm!: FormGroup;
  errorSummary: any = [];
  @Output() answerTwoEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService
  ) { }

  ngOnInit() {
    this.initQuestionTwoForm();
  }

  initQuestionTwoForm() {
    this.questionTwoForm = this.formBuilder.group({
      day: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      month: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      year: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    if (this.questionTwoForm.valid) {
      this.signUpService.removeHashPathFromCurrentPath();
      const day = this.questionTwoForm.get('day').value;
      const month = this.questionTwoForm.get('month').value;
      const year = this.questionTwoForm.get('year').value;
      const dateOfBirth = moment(`${year}/${month}/${day}`)
      if (moment(dateOfBirth, 'YYYY/MM/DD').isValid()) {
        this.answerTwoEvent.emit({
          dateOfBirth: dateOfBirth.toString()
        })
      } else {
        this.questionTwoForm.controls['day'].setErrors({'invalid': true});
        this.getAllFormValidationErrors();
      }
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionTwoForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.questionTwoForm.get(control).errors;
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
