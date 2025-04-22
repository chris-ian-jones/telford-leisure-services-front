import {
  Component,
  computed,
  effect,
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
import { BusyButtonDirective } from './../../shared/directives/busy-button.directive';
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
    ErrorSummaryComponent,
    BusyButtonDirective
  ]
})
export default class SignInComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;

  form = signal<FormGroup<SignInForm>>(this.initForm());
  errors = signal<ErrorSummaryItem[]>([]);

  readonly isLoading = computed(() =>
    this.authService.signInResource.isLoading()
  );
  readonly hasErrors = computed(() => this.errors().length > 0);

  constructor() {
    effect(() => {
      const result = this.authService.signInResource.value();
      const error = this.authService.signInResource.error() as {
        error: {
          statusCode: number;
          message: string;
          error: string;
        };
      };
      if (error) {
        if (error.error.error === 'Unauthorized') {
          this.form().controls['memberNumber'].setErrors({
            unauthorized: true
          });
        } else {
          this.form().controls['memberNumber'].setErrors({ error: true });
        }
        this.handleFormValidationErrors();
        setTimeout(() => this.errorSummary.focusErrorSummary());
      } else if (result) {
        this.router.navigateByUrl('dashboard');
      }
    });
  }

  ngOnInit() {
    this.authService.setSignInData(undefined);
    this.form.set(this.initForm());
    this.form().controls['memberNumber'].setErrors(null);
    this.form().controls['password'].setErrors(null);
    this.errors.set([]);
  }

  private initForm(): FormGroup<SignInForm> {
    return this.formBuilder.group<SignInForm>(
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
    this.errors.set([]);

    if (this.form().valid) {
      const unformattedMemberNumber = this.form().get('memberNumber')?.value;
      const payload: SignIn = {
        memberNumber: unformattedMemberNumber?.toString() || '',
        password: this.form().get('password')?.value || ''
      };
      this.authService.setSignInData(payload);
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.form().controls).forEach((control) => {
      const controlErrors = this.form().get(control)?.errors;
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

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    element?.focus();
  }
}
