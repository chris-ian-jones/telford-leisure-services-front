import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @ViewChild('maleInput', {static: false}) maleInput: ElementRef;
  @ViewChild('femaleInput', {static: false}) femaleInput: ElementRef;

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

  selectInput(value:string) {
    this.questionThreeForm.controls['gender'].setValue(value)
    if (value === 'Male') {
      setTimeout(() => this.maleInput.nativeElement.focus());
    } else if (value === 'Female') {
      setTimeout(() => this.femaleInput.nativeElement.focus());
    }
  }

  onClickContinue() {
    // if (this.questionThreeForm.valid) {
    //   this.answerThreeEvent.emit(this.questionThreeForm.controls['gender'].value)
    // } else {
        
    // }
    console.log('gender = ', this.questionThreeForm.get('gender').value)
  }
}
