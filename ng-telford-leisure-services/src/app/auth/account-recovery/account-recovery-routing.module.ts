import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountRecoveryComponent } from './account-recovery.component';

const routes: Routes = [
  {
    path: '',
    component: AccountRecoveryComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRecoveryRoutingModule {}
