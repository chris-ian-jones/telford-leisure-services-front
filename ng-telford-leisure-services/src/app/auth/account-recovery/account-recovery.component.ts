import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss']
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
