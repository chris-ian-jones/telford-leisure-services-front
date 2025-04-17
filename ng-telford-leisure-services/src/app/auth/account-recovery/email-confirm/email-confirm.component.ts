import {
  Component,
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
import { SignUpService } from '../../sign-up/sign-up.service';
import { AccountRecoveryService } from '../account-recovery.service';
import { Email } from './../../../core/models/email';
import { lastValueFrom } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from 'src/app/core/constants/form-errors';
import { ErrorSummaryComponent } from 'src/app/shared/error-summary/error-summary.component';

interface EmailForm {
  email: FormControl<string | null>;
}

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrl: './email-confirm.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ErrorSummaryComponent
  ]
})
export class EmailConfirmComponent implements OnInit {
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @Output() changeComponentEvent = new EventEmitter<any>();
  @Output() emitMemberEmailEvent = new EventEmitter<any>();
  emailForm!: FormGroup<EmailForm>;
  errors: ErrorSummaryItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private accountRecoveryService: AccountRecoveryService
  ) {}

  ngOnInit() {
    this.initEmailForm();
  }

  initEmailForm() {
    this.emailForm = this.formBuilder.group<EmailForm>(
      {
        email: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required, Validators.email]
        })
      },
      { updateOn: 'submit' }
    );
  }

  onClickContinue() {
    this.errors.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.emailForm.valid) {
      const email: Email = this.emailForm.value as Email;
      this.sendConfirmationCodeEmail(email);
    } else {
      this.handleFormValidationErrors();
    }
  }

  async sendConfirmationCodeEmail(email: Email) {
    try {
      let response: any = await lastValueFrom(
        this.accountRecoveryService.sendConfirmationCodeEmail(email)
      );
      this.routeToNextStep();
    } catch {
      this.routeToNextStep();
    }
  }

  routeToNextStep() {
    this.emitMemberEmailEvent.emit(this.emailForm.controls['email'].value);
    this.changeComponentEvent.emit('email-code');
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.emailForm.controls).forEach((control) => {
      const controlErrors = this.emailForm.get(control)?.errors;
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
