import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from 'src/app/core/constants/form-errors';
import { ErrorSummaryComponent } from 'src/app/shared/error-summary/error-summary.component';

interface EmailCheckForm {
  emailCheck: FormControl<string | null>;
}

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrl: './email-check.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ErrorSummaryComponent
  ]
})
export class EmailCheckComponent implements OnInit {
  @ViewChild('yesInput', { static: false }) yesInput: ElementRef;
  @ViewChild('noInput', { static: false }) noInput: ElementRef;
  @Output() changeComponentEvent = new EventEmitter<any>();
  emailCheckForm!: FormGroup<EmailCheckForm>;
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  errors: ErrorSummaryItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initEmailCheckForm();
  }

  initEmailCheckForm() {
    this.emailCheckForm = this.formBuilder.group<EmailCheckForm>({
      emailCheck: new FormControl('', {
        nonNullable: false,
        validators: [Validators.required]
      })
    });
  }

  selectInput(value: string) {
    this.emailCheckForm.controls['emailCheck'].setValue(value);
    this.errors.length = 0;

    switch (value) {
      case 'Yes': {
        setTimeout(() => this.yesInput.nativeElement.focus());
        break;
      }
      case 'No': {
        setTimeout(() => this.noInput.nativeElement.focus());
        break;
      }
      default: {
        setTimeout(() => this.yesInput.nativeElement.focus());
        break;
      }
    }
  }

  onClickContinue() {
    this.errors.length = 0;
    if (this.emailCheckForm.valid) {
      if (this.emailCheckForm.controls['emailCheck'].value === 'Yes') {
        this.router.navigateByUrl('/sign-in');
      } else {
        this.changeComponentEvent.emit('email-confirm');
      }
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.emailCheckForm.controls).forEach((control) => {
      const controlErrors = this.emailCheckForm.get(control)?.errors;
      if (!controlErrors) return;

      const controlErrorMessages = ERROR_MESSAGES[control];
      if (!controlErrorMessages) return;

      Object.keys(controlErrors).forEach((errorType) => {
        if (controlErrorMessages[errorType]) {
          newErrors.push(controlErrorMessages[errorType]);
        }
      });
    });

    this.errors = newErrors;
    setTimeout(() => this.errorSummary.focusErrorSummary());
  }

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }
}
