import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
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
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  signInForm!: FormGroup<SignInForm>;

  readonly isLoading = signal(false);
  private readonly errorState = signal<ErrorSummaryItem[]>([]);
  readonly errors = computed(() => this.errorState());

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
    this.errorState.set([]);

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

  memberSignIn(payload: SignIn) {
    this.isLoading.set(true);

    this.authService.memberSignIn(payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('dashboard');
      },
      error: (error) => {
        this.isLoading.set(false);

        if (error.error.error === 'Unauthorized') {
          this.signInForm.controls['memberNumber'].setErrors({
            unauthorized: true
          });
        } else {
          this.signInForm.controls['memberNumber'].setErrors({ error: true });
        }

        this.handleFormValidationErrors();
        setTimeout(() => this.errorSummary.focusErrorSummary());
      }
    });
  }

  handleFormValidationErrors() {
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

    this.errorState.set(newErrors);
    setTimeout(() => this.errorSummary.focusErrorSummary());
  }

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }
}
