import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.component.html',
  styleUrls: ['./question-two.component.scss']
})
export class QuestionTwoComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  questionTwoForm!: FormGroup;
  @Output() answerTwoEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initQuestionTwoForm();
  }

  initQuestionTwoForm() {
    this.questionTwoForm = this.formBuilder.group({
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    if (this.questionTwoForm.valid) {
      const formattedDate = '2/2/2222'
      this.answerTwoEvent.emit(formattedDate)
    } else {
      
    }
  }

  
}
