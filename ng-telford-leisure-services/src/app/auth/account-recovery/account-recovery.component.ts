import { CommonModule, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
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
  styleUrls: ['./account-recovery.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    EmailCheckComponent,
    EmailConfirmComponent,
    EmailCodeComponent,
    MemberNumberRecoveredComponent,
    ChangePasswordComponent,
    PasswordResetComponent,
    RouterModule,
    NgSwitch,
    NgSwitchCase
  ]
})
export class AccountRecoveryComponent {
  shownComponent: string = '';
  path: string = '';
  memberEmail: string = '';
  memberNumber: string = '';
  confirmationCode: string = '';

  constructor(public activatedRoute: ActivatedRoute, public router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.shownComponent =
        this.router.getCurrentNavigation().extras.state['route'];
      this.path = this.router.getCurrentNavigation().extras.state['path'];
    } else {
      this.shownComponent = 'email-check';
      this.path = 'forgot-member-number';
    }
  }

  receiveComponentChange($event: any) {
    this.shownComponent = $event;
    window.scrollTo(0, 0);
  }

  receiveMemberEmail($event: any) {
    this.memberEmail = $event;
  }

  receiveMemberNumber($event: any) {
    this.memberNumber = $event;
  }

  receiveConfirmationCode($event: any) {
    this.confirmationCode = $event;
  }
}
