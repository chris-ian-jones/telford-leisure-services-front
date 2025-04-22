import { Component, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountRecoveryService } from '../account-recovery.service';

@Component({
  selector: 'app-member-number-recovered',
  templateUrl: './member-number-recovered.component.html',
  styleUrl: './member-number-recovered.component.scss',
  imports: [CommonModule, RouterModule]
})
export class MemberNumberRecoveredComponent {
  memberEmail = input.required<string>();
  memberNumber = input.required<string>();

  private readonly router = inject(Router);
  private readonly accountRecoveryService = inject(AccountRecoveryService);

  routeToSignIn() {
    this.accountRecoveryService.setChangePasswordData(undefined);
    this.accountRecoveryService.setConfirmationCodeData(undefined);
    this.accountRecoveryService.setValidateCodeData(undefined);
    this.accountRecoveryService.setForgotMemberData(undefined);
    this.router.navigateByUrl('/sign-in');
  }
}
