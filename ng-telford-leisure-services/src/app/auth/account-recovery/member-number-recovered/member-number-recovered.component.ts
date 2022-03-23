import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-number-recovered',
  templateUrl: './member-number-recovered.component.html',
  styleUrls: ['./member-number-recovered.component.scss']
})
export class MemberNumberRecoveredComponent implements OnInit {

  @Input() memberEmail!: string;
  @Input() memberNumber!: string;

  constructor() { }

  ngOnInit() {
    console.log('memberEmail: ', this.memberEmail)
    console.log('memberNumber: ', this.memberNumber)
  }

}
