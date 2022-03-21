import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  @ViewChild('verySatisfiedInput', {static: false}) verySatisfiedInput: ElementRef;
  @ViewChild('satisfiedInput', {static: false}) satisfiedInput: ElementRef;
  @ViewChild('neitherInput', {static: false}) neitherInput: ElementRef;
  @ViewChild('dissatisfiedInput', {static: false}) dissatisfiedInput: ElementRef;
  @ViewChild('veryDissatisfiedInput', {static: false}) veryDissatisfiedInput: ElementRef;
  @ViewChild('otherInput', {static: false}) otherInput: ElementRef;
  satisfactionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initSatisfactionForm();
  }

  initSatisfactionForm() {
    this.satisfactionForm = this.formBuilder.group({
      satisfaction: ['', [Validators.required]],
    })
  }

  selectInput(value:string) {
    this.satisfactionForm.controls['satisfaction'].setValue(value)

    switch(value) {
      case 'Very satisfied': {
        setTimeout(() => this.verySatisfiedInput.nativeElement.focus());
        break;
      }
      case 'Satisfied': {
        setTimeout(() => this.satisfiedInput.nativeElement.focus());
        break;
      }
      case 'Neither satisfied or dissatisfied': {
        setTimeout(() => this.neitherInput.nativeElement.focus());
        break;
      }
      case 'Dissatisfied': {
        setTimeout(() => this.dissatisfiedInput.nativeElement.focus());
        break;
      }
      case 'Very dissatisfied': {
        setTimeout(() => this.veryDissatisfiedInput.nativeElement.focus());
        break;
      }
      default: {
        setTimeout(() => this.verySatisfiedInput.nativeElement.focus());
        break;
      } 
    }
  }

  onClickHome() {
    
  }

  onClickSendFeedback() {

  }

}
