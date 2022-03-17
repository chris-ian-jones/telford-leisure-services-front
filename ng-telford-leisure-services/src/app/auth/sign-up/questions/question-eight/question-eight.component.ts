import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-eight',
  templateUrl: './question-eight.component.html',
  styleUrls: ['./question-eight.component.scss']
})
export class QuestionEightComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() answerEightEvent = new EventEmitter<any>();
  @ViewChild('adtInput', {static: false}) adtInput: ElementRef;
  @ViewChild('hcoInput', {static: false}) hcoInput: ElementRef;
  @ViewChild('haeInput', {static: false}) haeInput: ElementRef;
  @ViewChild('hccInput', {static: false}) hccInput: ElementRef;
  questionEightForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initQuestionEightForm();
  }

  initQuestionEightForm() {
    this.questionEightForm = this.formBuilder.group({
      membershipType: ['', [Validators.required]],
    })
  }

  selectInput(value:string) {
    this.questionEightForm.controls['membershipType'].setValue(value)

    switch(value) {
      case 'TLC Adt Resident 16+ - ADT': {
        setTimeout(() => this.adtInput.nativeElement.focus());
        break;
      }
      case 'Annual Cash Concession - HCO': {
        setTimeout(() => this.hcoInput.nativeElement.focus());
        break;
      }
      case 'Aspirations All Inclusive - HAE': {
        setTimeout(() => this.haeInput.nativeElement.focus());
        break;
      }
      case 'Aspirations No Contract - HCC': {
        setTimeout(() => this.hccInput.nativeElement.focus());
        break;
      }
      default: {
        setTimeout(() => this.adtInput.nativeElement.focus());
        break;
      } 
    }
  }

  onClickContinue() {
    if (this.questionEightForm.valid) {
      this.answerEightEvent.emit(this.questionEightForm.value)
    } else {
      
    }
  }

}
