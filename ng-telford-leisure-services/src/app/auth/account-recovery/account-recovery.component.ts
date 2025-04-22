import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmailCodeComponent } from './email-code/email-code.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { MemberNumberRecoveredComponent } from './member-number-recovered/member-number-recovered.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { EmailCheckComponent } from './email-check/email-check.component';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrl: './account-recovery.component.scss',
  imports: [
    CommonModule,
    EmailCheckComponent,
    EmailConfirmComponent,
    EmailCodeComponent,
    MemberNumberRecoveredComponent,
    ChangePasswordComponent,
    PasswordResetComponent,
    RouterModule
  ]
})
export default class AccountRecoveryComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  shownComponent = signal<string>('');
  path = signal<string>('');
  memberEmail = signal<string>('');
  memberNumber = signal<string>('');
  confirmationCode = signal<string>('');

  constructor() {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation()?.extras.state;
      this.shownComponent.set(state['route']);
      this.path.set(state['path']);
    } else {
      this.shownComponent.set('email-check');
      this.path.set('forgot-member-number');
    }
  }

  receiveComponentChange(component: string) {
    this.shownComponent.set(component);
    window.scrollTo(0, 0);
  }

  receiveMemberEmail(email: string) {
    this.memberEmail.set(email);
  }

  receiveMemberNumber(number: string) {
    this.memberNumber.set(number);
  }

  receiveConfirmationCode(code: string) {
    this.confirmationCode.set(code);
  }
}
