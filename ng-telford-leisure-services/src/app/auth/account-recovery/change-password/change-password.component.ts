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
import { Router } from '@angular/router';
import { ChangePassword } from './../../../core/models/changePassword';
import { AccountRecoveryService } from '../account-recovery.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from './../../../core/constants/form-errors';
import { ErrorSummaryComponent } from '../../../shared/components/error-summary/error-summary.component';

interface PasswordForm {
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ErrorSummaryComponent
  ]
})
export class ChangePasswordComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly accountRecoveryService = inject(AccountRecoveryService);

  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @Output() changeComponentEvent = new EventEmitter<any>();

  memberEmail = input.required<string>();
  confirmationCode = input.required<string>();

  form = signal<FormGroup<PasswordForm>>(this.initForm());
  errors = signal<ErrorSummaryItem[]>([]);

  constructor() {
    effect(() => {
      const changePasswordResource =
        this.accountRecoveryService.changePasswordResource;

      const error = changePasswordResource.error();
      if (error) {
        this.form().controls['password'].setErrors({ token: true });
        this.handleFormValidationErrors();
        return;
      }

      const result = changePasswordResource.value();
      if (result) {
        this.changeComponentEvent.emit('password-reset');
      }
    });
  }

  private initForm() {
    return this.formBuilder.group<PasswordForm>(
      {
        password: new FormControl('', {
          nonNullable: false,
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{0,}$/
            )
          ]
        }),
        confirmPassword: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required]
        })
      },
      { updateOn: 'submit' }
    );
  }

  checkPasswords() {
    const form = this.form();
    const password = form.controls['password'].value;
    const confirmPassword = form.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      form.controls['confirmPassword'].setErrors({ match: true });
    }
  }

  onClickContinue() {
    this.checkPasswords();
    const form = this.form();

    if (form.valid) {
      const payload: ChangePassword = {
        email: this.memberEmail(),
        confirmationCode: this.confirmationCode(),
        password: form.controls['password'].value
      };
      this.accountRecoveryService.setChangePasswordData(payload);
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

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl], {
        state: { route: 'email-confirm', path: 'forgot-password' }
      });
    });
  }

  focusElement(elementId: string) {
    if (elementId === 'reloadCurrentRoute') {
      this.reloadCurrentRoute();
    } else {
      const element = document.getElementById(elementId);

      element?.focus();
    }
  }
}
