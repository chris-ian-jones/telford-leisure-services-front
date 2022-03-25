import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss']
})
export class AccountRecoveryComponent implements OnInit {

  shownComponent:string = '';
  path:string = ''
  memberEmail:string = '';
  memberNumber:string = '';
  confirmationCode:string = '';

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.shownComponent = this.router.getCurrentNavigation().extras.state['route'];
    this.path = this.router.getCurrentNavigation().extras.state['path'];
  }

  ngOnInit() {}

  receiveComponentChange($event: any) {
    this.shownComponent = $event;
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
