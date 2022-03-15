import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-three',
  templateUrl: './question-three.component.html',
  styleUrls: ['./question-three.component.scss']
})
export class QuestionThreeComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() answerThreeEvent = new EventEmitter<any>();
  questionThreeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.initQuestionThreeForm();
  }

  initQuestionThreeForm() {
    this.questionThreeForm = this.formBuilder.group({
      gender: ['', [Validators.required]],
    })
  }

  onClickContinue() {
    // if (this.questionThreeForm.valid) {
    //   this.answerThreeEvent.emit(this.questionThreeForm.controls['gender'].value)
    // } else {
        
    // }
    console.log('gender = ', this.questionThreeForm.get('gender').value)
  }
}
