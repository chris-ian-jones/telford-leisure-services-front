import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
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
import { SignUpService } from '../../sign-up/sign-up.service';
import { AccountRecoveryService } from '../account-recovery.service';
import { Email } from './../../../core/models/email';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from '../../../core/constants/form-errors';
import { ErrorSummaryComponent } from './../../../shared/components/error-summary/error-summary.component';
import { BusyButtonDirective } from '../../../shared/directives/busy-button.directive';

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
    ErrorSummaryComponent,
    BusyButtonDirective
  ]
})
export class EmailConfirmComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly signUpService = inject(SignUpService);
  private readonly accountRecoveryService = inject(AccountRecoveryService);

  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @Output() changeComponentEvent = new EventEmitter<any>();
  @Output() emitMemberEmailEvent = new EventEmitter<any>();

  form = signal<FormGroup<EmailForm>>(this.initForm());
  errors = signal<ErrorSummaryItem[]>([]);

  readonly isLoading = computed(() =>
    this.accountRecoveryService.confirmationCodeResource.isLoading()
  );

  constructor() {
    this.accountRecoveryService.setConfirmationCodeData(undefined);

    effect(() => {
      const confirmationCodeResource =
        this.accountRecoveryService.confirmationCodeResource;

      const result = confirmationCodeResource.value();
      if (result || confirmationCodeResource.error()) {
        this.routeToNextStep();
      }
    });
  }

  private initForm() {
    return this.formBuilder.group<EmailForm>(
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
    this.errors.set([]);
    this.signUpService.removeHashPathFromCurrentPath();

    const form = this.form();
    if (form.valid) {
      if (this.isLoading()) {
        return;
      }

      const email: Email = form.value as Email;
      this.accountRecoveryService.setConfirmationCodeData(email);
    } else {
      this.handleFormValidationErrors();
    }
  }

  private routeToNextStep() {
    this.emitMemberEmailEvent.emit(this.form().controls['email'].value);
    this.changeComponentEvent.emit('email-code');
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

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    element?.focus();
  }
}
