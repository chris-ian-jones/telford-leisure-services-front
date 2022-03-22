import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss']
})
export class AccountRecoveryComponent implements OnInit {

  shownComponent:string = 'email-check';

  constructor() { }

  ngOnInit() {
  }

  receiveComponentChange($event: any) {
    this.shownComponent = $event;
  }

}
