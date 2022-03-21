import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRecoveryComponent } from './account-recovery.component';
import { AccountRecoveryRoutingModule } from './account-recovery-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailCheckComponent } from './email-check/email-check.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';

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
    EmailConfirmComponent
  ]
})
export class AccountRecoveryModule { }
