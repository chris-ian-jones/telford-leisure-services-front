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
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

interface QuestionTwoForm {
  day: FormControl<string | null>;
  month: FormControl<string | null>;
  year: FormControl<string | null>;
}

@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.component.html',
  styleUrls: ['./question-two.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  providers: [DatePipe]
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
    private signUpService: SignUpService,
    private datePipe: DatePipe
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
      const dateOfBirth = new Date(this.newMemberData.dateOfBirth);
      const dayOfBirth = dateOfBirth.getDate();
      const monthOfBirth = dateOfBirth.getMonth() + 1;
      const yearOfBirth = dateOfBirth.getFullYear();

      this.questionTwoForm.patchValue({
        day: dayOfBirth,
        month: monthOfBirth,
        year: yearOfBirth
      });
    }
  }

  onClickContinue() {
    if (this.questionTwoForm.valid) {
      this.signUpService.removeHashPathFromCurrentPath();
      const day = this.questionTwoForm.get('day').value;
      const month = this.questionTwoForm.get('month').value;
      const year = this.questionTwoForm.get('year').value;
      const dateString = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;

      const dateOfBirth = new Date(dateString);
      const isValidDate =
        !isNaN(dateOfBirth.getTime()) &&
        dateOfBirth.getFullYear() === Number(year) &&
        dateOfBirth.getMonth() === Number(month) - 1 &&
        dateOfBirth.getDate() === Number(day);

      if (isValidDate) {
        this.answerTwoEvent.emit({
          dateOfBirth: this.datePipe.transform(dateOfBirth, 'yyyy-MM-dd')
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

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }
}
