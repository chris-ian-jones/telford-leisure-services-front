import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.component.html',
  styleUrls: ['./question-four.component.scss']
})
export class QuestionFourComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  questionFourForm!: FormGroup;
  @Output() answerOneEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initQuestionFourForm();
  }

  initQuestionFourForm() {
    this.questionFourForm = this.formBuilder.group({
      email: ['', Validators.required],
      phone: [''],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    
  }

}
