import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRecoveryComponent } from './account-recovery.component';
import { AccountRecoveryRoutingModule } from './account-recovery-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailCheckComponent } from './email-check/email-check.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { EmailCodeComponent } from './email-code/email-code.component';
import { AccountRecoveryService } from './account-recovery.service';
import { MemberNumberRecoveredComponent } from './member-number-recovered/member-number-recovered.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRecoveryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountRecoveryComponent,
    EmailCheckComponent,
    EmailConfirmComponent,
    EmailCodeComponent,
    MemberNumberRecoveredComponent,
    ChangePasswordComponent,
    PasswordResetComponent,
  ],
  providers: [
    AccountRecoveryService
  ]
})
export class AccountRecoveryModule { }
