import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Member } from './../../../../core/models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface QuestionEightForm {
  membershipType: FormControl<string | null>;
}

@Component({
  selector: 'app-question-eight',
  templateUrl: './question-eight.component.html',
  styleUrls: ['./question-eight.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule]
})
export class QuestionEightComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  @Output() answerEightEvent = new EventEmitter<any>();
  @ViewChild('adtInput', { static: false }) adtInput: ElementRef;
  @ViewChild('hcoInput', { static: false }) hcoInput: ElementRef;
  @ViewChild('haeInput', { static: false }) haeInput: ElementRef;
  @ViewChild('hccInput', { static: false }) hccInput: ElementRef;
  questionEightForm!: FormGroup<QuestionEightForm>;
  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;
  errorSummary: any = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initQuestionEightForm();
  }

  initQuestionEightForm() {
    this.questionEightForm = this.formBuilder.group<QuestionEightForm>({
      membershipType: new FormControl('', {
        nonNullable: false,
        validators: [Validators.required]
      })
    });
  }

  selectInput(value: string) {
    this.questionEightForm.controls['membershipType'].setValue(value);
    this.errorSummary.length = 0;

    switch (value) {
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
      this.answerEightEvent.emit(this.questionEightForm.value);
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionEightForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.questionEightForm.get(control).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((error) => {
          this.errorSummary.push({
            control,
            error
          });
        });
        setTimeout(() => this.errorSummaryDiv.nativeElement.focus());
      }
    });
  }

  onClickMembershipTypeRequiredError() {
    setTimeout(() => this.adtInput.nativeElement.focus());
  }
}
