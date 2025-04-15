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
  FormControl
} from '@angular/forms';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';
import * as moment from 'moment';

interface QuestionTwoForm {
  day: FormControl<string | null>;
  month: FormControl<string | null>;
  year: FormControl<string | null>;
}

@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.component.html',
  styleUrls: ['./question-two.component.scss']
})
export class QuestionTwoComponent implements OnInit {
  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  questionTwoForm!: FormGroup;
  errorSummary: any = [];
  @Output() answerTwoEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService
  ) {}

  ngOnInit() {
    this.initQuestionTwoForm();
  }

  initQuestionTwoForm() {
    this.questionTwoForm = this.formBuilder.group<QuestionTwoForm>(
      {
        day: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required, Validators.pattern('^[0-9]*$')]
        }),
        month: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required, Validators.pattern('^[0-9]*$')]
        }),
        year: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required, Validators.pattern('^[0-9]*$')]
        })
      },
      { updateOn: 'submit' }
    );

    if (this.newMemberData.dateOfBirth) {
      const dateOfBirth = moment(this.newMemberData.dateOfBirth);
      const dayOfBirth = moment(dateOfBirth).date();
      const monthOfBirth = 1 + moment(dateOfBirth).month();
      const yearOfBirth = moment(dateOfBirth).year();
      this.questionTwoForm.controls['day'].setValue(dayOfBirth);
      this.questionTwoForm.controls['month'].setValue(monthOfBirth);
      this.questionTwoForm.controls['year'].setValue(yearOfBirth);
    }
  }

  onClickContinue() {
    if (this.questionTwoForm.valid) {
      this.signUpService.removeHashPathFromCurrentPath();
      const day = this.questionTwoForm.get('day').value;
      const month = this.questionTwoForm.get('month').value;
      const year = this.questionTwoForm.get('year').value;
      const dateOfBirth = moment(`${year}/${month}/${day}`);
      if (moment(dateOfBirth, 'YYYY/MM/DD').isValid()) {
        this.answerTwoEvent.emit({
          dateOfBirth: dateOfBirth.toString()
        });
      } else {
        this.questionTwoForm.controls['day'].setErrors({ invalid: true });
        this.getAllFormValidationErrors();
      }
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionTwoForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.questionTwoForm.get(control).errors;
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
