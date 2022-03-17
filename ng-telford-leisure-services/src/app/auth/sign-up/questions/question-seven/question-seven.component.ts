import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-seven',
  templateUrl: './question-seven.component.html',
  styleUrls: ['./question-seven.component.scss']
})
export class QuestionSevenComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() answerSevenEvent = new EventEmitter<any>();
  @ViewChild('abrahamInput', {static: false}) abrahamInput: ElementRef;
  @ViewChild('horsehayInput', {static: false}) horsehayInput: ElementRef;
  @ViewChild('newportInput', {static: false}) newportInput: ElementRef;
  @ViewChild('oakengatesInput', {static: false}) oakengatesInput: ElementRef;
  @ViewChild('phoenixInput', {static: false}) phoenixInput: ElementRef;
  @ViewChild('stirchleyInput', {static: false}) stirchleyInput: ElementRef;
  @ViewChild('wellingtonInput', {static: false}) wellingtonInput: ElementRef;
  questionSevenForm!: FormGroup;
  @ViewChild('errorSummary', {static: false}) errorSummaryDiv!: ElementRef;
  errorSummary: any = [];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initQuestionSevenForm();
  }

  initQuestionSevenForm() {
    this.questionSevenForm = this.formBuilder.group({
      mainCenter: ['', [Validators.required]],
    })
  }

  selectInput(value:string) {
    this.questionSevenForm.controls['mainCenter'].setValue(value)
    this.errorSummary.length = 0;

    switch(value) {
      case 'Abraham Darby Sports and Leisure Center': {
        setTimeout(() => this.abrahamInput.nativeElement.focus());
        break;
      }
      case 'Horsehay Village Golf Club': {
        setTimeout(() => this.horsehayInput.nativeElement.focus());
        break;
      }
      case 'Newport Swimming Pool': {
        setTimeout(() => this.newportInput.nativeElement.focus());
        break;
      }
      case 'Oakengates Leisure Centre': {
        setTimeout(() => this.oakengatesInput.nativeElement.focus());
        break;
      }
      case 'Phoenix Sports and Leisure Centre': {
        setTimeout(() => this.phoenixInput.nativeElement.focus());
        break;
      }
      case 'Stirchley Recreation Center': {
        setTimeout(() => this.stirchleyInput.nativeElement.focus());
        break;
      }
      case 'Wellington Civic and Leisure Centre': {
        setTimeout(() => this.wellingtonInput.nativeElement.focus());
        break;
      }
      default: {
        setTimeout(() => this.abrahamInput.nativeElement.focus());
        break;
      } 
    }
  }

  onClickContinue() {
    if (this.questionSevenForm.valid) {
      this.answerSevenEvent.emit(this.questionSevenForm.value)
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionSevenForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.questionSevenForm.get(control).errors;
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

  onClickMainCenterRequiredError() {
    setTimeout(() => this.abrahamInput.nativeElement.focus());
  }

}
