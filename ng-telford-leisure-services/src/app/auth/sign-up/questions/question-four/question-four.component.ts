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
  Validators
} from '@angular/forms';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';

@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.component.html',
  styleUrls: ['./question-four.component.scss']
})
export class QuestionFourComponent implements OnInit {
  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  questionFourForm!: FormGroup;
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
    this.questionFourForm = this.formBuilder.group(
      {
        email: [
          this.newMemberData.email,
          [Validators.required, Validators.email]
        ],
        phone: [this.newMemberData.phone, Validators.pattern('[- +()0-9]+')]
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
}
