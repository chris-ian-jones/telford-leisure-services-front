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
import { EmailCode } from '../../../core/models/emailCode';
import { SignUpService } from '../../sign-up/sign-up.service';
import { AccountRecoveryService } from '../account-recovery.service';
import { lastValueFrom } from 'rxjs';
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
export class EmailCodeComponent implements OnInit {
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @Input() memberEmail!: string;
  @Input() path: string;
  @Output() changeComponentEvent = new EventEmitter<any>();
  @Output() emitMemberNumberEvent = new EventEmitter<any>();
  @Output() emitConfirmationCodeEvent = new EventEmitter<any>();
  confirmationCodeForm!: FormGroup<ConfirmationCodeForm>;
  errors: ErrorSummaryItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private accountRecoveryService: AccountRecoveryService
  ) {}

  ngOnInit() {
    this.initConfirmationCodeForm();
  }

  initConfirmationCodeForm() {
    this.confirmationCodeForm = this.formBuilder.group<ConfirmationCodeForm>(
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
    this.errors.length = 0;
    this.signUpService.removeHashPathFromCurrentPath();
    if (this.confirmationCodeForm.valid) {
      const payload: EmailCode = {
        email: this.memberEmail,
        confirmationCode:
          this.confirmationCodeForm.controls['confirmationCode'].value
      };
      if (this.path === 'forgot-member-number') {
        this.forgotMemberNumber(payload);
      } else {
        this.validateConfirmationCode(payload);
      }
    } else {
      this.handleFormValidationErrors();
    }
  }

  async forgotMemberNumber(payload: EmailCode) {
    try {
      let response: any = await lastValueFrom(
        this.accountRecoveryService.forgotMemberNumber(payload)
      );
      this.emitMemberNumberEvent.emit(response.body.memberNumber);
      this.changeComponentEvent.emit('member-number-recovered');
    } catch {
      this.confirmationCodeForm.controls['confirmationCode'].setErrors({
        incorrect: true
      });
      this.handleFormValidationErrors();
    }
  }

  async validateConfirmationCode(payload: EmailCode) {
    try {
      let response: any = await lastValueFrom(
        this.accountRecoveryService.validateConfirmationCode(payload)
      );
      this.emitConfirmationCodeEvent.emit(
        this.confirmationCodeForm.controls['confirmationCode'].value
      );
      this.changeComponentEvent.emit('change-password');
    } catch {
      this.confirmationCodeForm.controls['confirmationCode'].setErrors({
        incorrect: true
      });
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    this.errors.length = 0;
    const newErrors: ErrorSummaryItem[] = [];

    Object.keys(this.confirmationCodeForm.controls).forEach((control) => {
      const controlErrors = this.confirmationCodeForm.get(control)?.errors;
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

  onClickBack() {
    this.changeComponentEvent.emit('email-confirm');
  }

  onClickStartAgain() {
    this.changeComponentEvent.emit('email-check');
  }

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }
}
