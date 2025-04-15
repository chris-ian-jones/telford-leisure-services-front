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
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

interface QuestionFourForm {
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}

@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.component.html',
  styleUrl: './question-four.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule]
})
export class QuestionFourComponent implements OnInit {
  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  questionFourForm!: FormGroup<QuestionFourForm>;
  @Output() answerFourEvent = new EventEmitter<any>();
  errorSummary: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService
  ) {}

  ngOnInit() {
    this.initQuestionFourForm();
  }

  initQuestionFourForm() {
    this.questionFourForm = this.formBuilder.group<QuestionFourForm>(
      {
        email: new FormControl(this.newMemberData.email, {
          nonNullable: false,
          validators: [Validators.required, Validators.email]
        }),
        phone: new FormControl(this.newMemberData.phone, {
          nonNullable: false,
          validators: [Validators.pattern('[- +()0-9]+')]
        })
      },
      { updateOn: 'submit' }
    );
  }

  onClickContinue() {
    this.errorSummary.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.questionFourForm.valid) {
      this.answerFourEvent.emit(this.questionFourForm.value);
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionFourForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.questionFourForm.get(control).errors;
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

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }
}
