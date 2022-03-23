import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-number-recovered',
  templateUrl: './member-number-recovered.component.html',
  styleUrls: ['./member-number-recovered.component.scss']
})
export class MemberNumberRecoveredComponent implements OnInit {

  @Input() memberEmail!: string;
  @Input() memberNumber!: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  routeToSignIn() {
    this.router.navigateByUrl('/sign-in')
  }

}
