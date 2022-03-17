import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
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
      postcode: ['', Validators.required],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    
  }

}
