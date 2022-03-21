import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRecoveryComponent } from './account-recovery.component';
import { AccountRecoveryRoutingModule } from './account-recovery-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AccountRecoveryRoutingModule
  ],
  declarations: [AccountRecoveryComponent]
})
export class AccountRecoveryModule { }
