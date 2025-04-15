import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SignIn } from 'src/app/core/models/signIn';
import { AuthService } from './../auth.service';
import { lastValueFrom } from 'rxjs';

interface SignInForm {
  memberNumber: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule]
})
export default class SignInComponent implements OnInit {
  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;
  signInForm!: FormGroup<SignInForm>;
  errorSummary: any = [];

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
    this.errorSummary.length = 0;
    if (this.signInForm.valid) {
      const unformattedMemberNumber = this.signInForm.get('memberNumber').value;
      const payload: SignIn = {
        memberNumber: unformattedMemberNumber.toString(),
        password: this.signInForm.get('password').value
      };
      this.memberSignIn(payload);
    } else {
      this.getAllFormValidationErrors();
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
        this.getAllFormValidationErrors();
      } else {
        this.signInForm.controls['memberNumber'].setErrors({ error: true });
        this.getAllFormValidationErrors();
      }
      setTimeout(() => this.errorSummaryDiv.nativeElement.focus());
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.signInForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.signInForm.get(control).errors;
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
