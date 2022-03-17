import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignUpService } from '../../sign-up.service';

@Component({
  selector: 'app-question-five',
  templateUrl: './question-five.component.html',
  styleUrls: ['./question-five.component.scss']
})
export class QuestionFiveComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() answerFiveEvent = new EventEmitter<any>();
  questionFiveForm!: FormGroup;
  errorSummary: any = [];
  @ViewChild('errorSummary', {static: false}) errorSummaryDiv!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService
  ) { }

  ngOnInit() {
    this.initQuestionFiveForm();
  }

  initQuestionFiveForm() {
    this.questionFiveForm = this.formBuilder.group({
      addressLineOne: ['', Validators.required],
      addressLineTwo: [''],
      townOrCity: [''],
      county: [''],
      postcode: ['', [Validators.required, Validators.pattern('^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$')]],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    this.errorSummary.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.questionFiveForm.valid) {
      this.answerFiveEvent.emit(this.questionFiveForm.value)
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionFiveForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.questionFiveForm.get(control).errors;
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
