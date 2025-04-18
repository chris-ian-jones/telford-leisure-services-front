import {
  Component,
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
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from './../../../core/models/changePassword';
import { AccountRecoveryService } from '../account-recovery.service';
import { lastValueFrom } from 'rxjs';
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
export class ChangePasswordComponent implements OnInit {
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @Input() memberEmail!: string;
  @Input() confirmationCode!: string;
  @Output() changeComponentEvent = new EventEmitter<any>();
  passwordForm!: FormGroup<PasswordForm>;
  errors: ErrorSummaryItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private accountRecoveryService: AccountRecoveryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initPasswordForm();
  }

  initPasswordForm() {
    this.passwordForm = this.formBuilder.group<PasswordForm>(
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
    const password = this.passwordForm.controls['password'].value;
    const confirmPassword = this.passwordForm.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      this.passwordForm.controls['confirmPassword'].setErrors({ match: true });
    }
  }

  onClickContinue() {
    this.checkPasswords();
    if (this.passwordForm.valid) {
      const payload: ChangePassword = {
        email: this.memberEmail,
        confirmationCode: this.confirmationCode,
        password: this.passwordForm.controls['password'].value
      };
      this.changePassword(payload);
    } else {
      this.handleFormValidationErrors();
    }
  }

  async changePassword(payload: ChangePassword) {
    try {
      let response: any = await lastValueFrom(
        this.accountRecoveryService.changePassword(payload)
      );
      this.changeComponentEvent.emit('password-reset');
    } catch {
      this.passwordForm.controls['password'].setErrors({ token: true });
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.passwordForm.controls).forEach((control) => {
      const controlErrors = this.passwordForm.get(control)?.errors;
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
      if (element) {
        element.focus();
      }
    }
  }
}
