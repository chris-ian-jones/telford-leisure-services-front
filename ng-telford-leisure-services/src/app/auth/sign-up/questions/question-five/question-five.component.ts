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
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface QuestionFiveForm {
  addressLineOne: FormControl<string | null>;
  addressLineTwo: FormControl<string | null>;
  townOrCity: FormControl<string | null>;
  county: FormControl<string | null>;
  postcode: FormControl<string | null>;
}

@Component({
  selector: 'app-question-five',
  templateUrl: './question-five.component.html',
  styleUrl: './question-five.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule]
})
export class QuestionFiveComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() newMemberData!: Member;
  @Output() answerFiveEvent = new EventEmitter<any>();
  questionFiveForm!: FormGroup<QuestionFiveForm>;
  errorSummary: any = [];
  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService
  ) {}

  ngOnInit() {
    this.initQuestionFiveForm();
  }

  initQuestionFiveForm() {
    this.questionFiveForm = this.formBuilder.group<QuestionFiveForm>(
      {
        addressLineOne: new FormControl(this.newMemberData.addressLineOne, {
          nonNullable: false,
          validators: [Validators.required]
        }),
        addressLineTwo: new FormControl(this.newMemberData.addressLineTwo, {
          nonNullable: false
        }),
        townOrCity: new FormControl(this.newMemberData.townOrCity, {
          nonNullable: false
        }),
        county: new FormControl(this.newMemberData.county, {
          nonNullable: false
        }),
        postcode: new FormControl(this.newMemberData.postcode, {
          nonNullable: false,
          validators: [
            Validators.required,
            Validators.pattern(
              '^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$'
            )
          ]
        })
      },
      { updateOn: 'submit' }
    );
  }

  onClickContinue() {
    this.errorSummary.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.questionFiveForm.valid) {
      this.answerFiveEvent.emit(this.questionFiveForm.value);
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.questionFiveForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.questionFiveForm.get(control).errors;
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
