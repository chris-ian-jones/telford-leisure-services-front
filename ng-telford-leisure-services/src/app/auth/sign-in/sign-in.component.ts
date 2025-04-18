import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SignIn } from './../../core/models/signIn';
import { AuthService } from './../auth.service';
import { lastValueFrom } from 'rxjs';
import { ErrorSummaryComponent } from './../../shared/components/error-summary/error-summary.component';
import {
  ErrorSummaryItem,
  ERROR_MESSAGES
} from './../../core/constants/form-errors';

interface SignInForm {
  memberNumber: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ErrorSummaryComponent
  ]
})
export default class SignInComponent implements OnInit {
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  signInForm!: FormGroup<SignInForm>;
  errors: ErrorSummaryItem[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initSignInForm();
  }

  initSignInForm() {
    this.signInForm = this.formBuilder.group<SignInForm>(
      {
        memberNumber: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required]
        }),
        password: new FormControl('', {
          nonNullable: false,
          validators: [Validators.required]
        })
      },
      { updateOn: 'submit' }
    );
  }

  signIn() {
    this.errors.length = 0;
    if (this.signInForm.valid) {
      const unformattedMemberNumber = this.signInForm.get('memberNumber').value;
      const payload: SignIn = {
        memberNumber: unformattedMemberNumber.toString(),
        password: this.signInForm.get('password').value
      };
      this.memberSignIn(payload);
    } else {
      this.handleFormValidationErrors();
    }
  }

  async memberSignIn(payload: SignIn) {
    try {
      let response: any = await lastValueFrom(
        this.authService.memberSignIn(payload)
      );
      this.router.navigateByUrl('dashboard');
    } catch (error: any) {
      if (error.error.error === 'Unauthorized') {
        this.signInForm.controls['memberNumber'].setErrors({
          unauthorized: true
        });
        this.handleFormValidationErrors();
      } else {
        this.signInForm.controls['memberNumber'].setErrors({ error: true });
        this.handleFormValidationErrors();
      }
      setTimeout(() => this.errorSummary.focusErrorSummary());
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.signInForm.controls).forEach((control) => {
      const controlErrors = this.signInForm.get(control)?.errors;
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
