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
import { EmailCode } from 'src/app/core/models/emailCode';
import { SignUpService } from '../../sign-up/sign-up.service';
import { AccountRecoveryService } from '../account-recovery.service';
import { lastValueFrom } from 'rxjs';

interface ConfirmationCodeForm {
  confirmationCode: FormControl<string | null>;
}

@Component({
  selector: 'app-email-code',
  templateUrl: './email-code.component.html',
  styleUrls: ['./email-code.component.scss']
})
export class EmailCodeComponent implements OnInit {
  @ViewChild('errorSummaryDiv', { static: false }) errorSummaryDiv!: ElementRef;
  @Input() memberEmail!: string;
  @Input() path: string;
  @Output() changeComponentEvent = new EventEmitter<any>();
  @Output() emitMemberNumberEvent = new EventEmitter<any>();
  @Output() emitConfirmationCodeEvent = new EventEmitter<any>();
  confirmationCodeForm!: FormGroup<ConfirmationCodeForm>;
  errorSummary: any = [];

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
        confirmationCode: new FormControl('', { nonNullable: false, validators: [Validators.required] })
      },
      { updateOn: 'submit' }
    );
  }

  onClickConfirm() {
    this.errorSummary.length = 0;
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
      this.getAllFormValidationErrors();
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
      this.getAllFormValidationErrors();
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
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.confirmationCodeForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.confirmationCodeForm.get(control).errors;
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

  onClickBack() {
    this.changeComponentEvent.emit('email-confirm');
  }

  onClickStartAgain() {
    this.changeComponentEvent.emit('email-check');
  }
}
