import {
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { EmailCode } from '../../../core/models/emailCode';
import { SignUpService } from '../../sign-up/sign-up.service';
import { AccountRecoveryService } from '../account-recovery.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from './../../../core/constants/form-errors';
import { ErrorSummaryComponent } from './../../../shared/components/error-summary/error-summary.component';

interface ConfirmationCodeForm {
  confirmationCode: FormControl<string | null>;
}

@Component({
  selector: 'app-email-code',
  templateUrl: './email-code.component.html',
  styleUrl: './email-code.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ErrorSummaryComponent
  ]
})
export class EmailCodeComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly signUpService = inject(SignUpService);
  private readonly accountRecoveryService = inject(AccountRecoveryService);

  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @Output() changeComponentEvent = new EventEmitter<any>();
  @Output() emitMemberNumberEvent = new EventEmitter<any>();
  @Output() emitConfirmationCodeEvent = new EventEmitter<any>();

  memberEmail = input.required<string>();
  path = input.required<string>();

  form = signal<FormGroup<ConfirmationCodeForm>>(
    this.initConfirmationCodeForm()
  );
  errors = signal<ErrorSummaryItem[]>([]);

  constructor() {
    effect(() => {
      const forgotMemberResource =
        this.accountRecoveryService.forgotMemberResource;

      const error = forgotMemberResource.error();
      if (error) {
        this.form().controls['confirmationCode'].setErrors({
          incorrect: true
        });
        this.handleFormValidationErrors();
        return;
      }

      const result = forgotMemberResource.value();
      if (result) {
        this.emitMemberNumberEvent.emit(result.memberNumber);
        this.changeComponentEvent.emit('member-number-recovered');
      }
    });

    effect(() => {
      const validateCodeResource =
        this.accountRecoveryService.validateCodeResource;

      const error = validateCodeResource.error();
      if (error) {
        this.form().controls['confirmationCode'].setErrors({
          incorrect: true
        });
        this.handleFormValidationErrors();
        return;
      }

      const result = validateCodeResource.value();
      if (result) {
        this.emitConfirmationCodeEvent.emit(
          this.form().controls['confirmationCode'].value
        );
        this.changeComponentEvent.emit('change-password');
      }
    });
  }

  private initConfirmationCodeForm() {
    return this.formBuilder.group<ConfirmationCodeForm>(
      {
        confirmationCode: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required]
        })
      },
      { updateOn: 'submit' }
    );
  }

  onClickConfirm() {
    this.errors.set([]);
    this.signUpService.removeHashPathFromCurrentPath();

    const form = this.form();
    if (form.valid) {
      const payload: EmailCode = {
        email: this.memberEmail(),
        confirmationCode: form.controls['confirmationCode'].value
      };

      if (this.path() === 'forgot-member-number') {
        this.accountRecoveryService.setForgotMemberData(payload);
      } else {
        this.accountRecoveryService.setValidateCodeData(payload);
      }
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    const newErrors: ErrorSummaryItem[] = [];
    const form = this.form();

    Object.keys(form.controls).forEach((control) => {
      const controlErrors = form.get(control)?.errors;
      if (!controlErrors) return;

      const controlErrorMessages = ERROR_MESSAGES[control];
      if (!controlErrorMessages) return;

      Object.keys(controlErrors).forEach((errorType) => {
        if (controlErrorMessages[errorType]) {
          newErrors.push(controlErrorMessages[errorType]);
        }
      });
    });

    this.errors.set(newErrors);
    setTimeout(() => this.errorSummary.focusErrorSummary());
  }

  onClickBack() {
    this.changeComponentEvent.emit('email-confirm');
  }

  onClickStartAgain() {
    this.changeComponentEvent.emit('email-check');
  }

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    element?.focus();
  }
}
