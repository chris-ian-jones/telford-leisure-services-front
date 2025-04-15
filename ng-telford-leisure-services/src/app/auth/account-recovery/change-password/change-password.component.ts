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
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/core/models/changePassword';
import { AccountRecoveryService } from '../account-recovery.service';
import { lastValueFrom } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PasswordForm {
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule]
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('errorSummaryDiv', { static: false }) errorSummaryDiv!: ElementRef;
  @Input() memberEmail!: string;
  @Input() confirmationCode!: string;
  @Output() changeComponentEvent = new EventEmitter<any>();
  passwordForm!: FormGroup<PasswordForm>;
  errorSummary: any = [];

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
      this.getAllFormValidationErrors();
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
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.passwordForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.passwordForm.get(control).errors;
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

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl], {
        state: { route: 'email-confirm', path: 'forgot-password' }
      });
    });
  }

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }
}
