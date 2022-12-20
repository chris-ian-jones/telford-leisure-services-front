import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-number-recovered',
  templateUrl: './member-number-recovered.component.html',
  styleUrls: ['./member-number-recovered.component.scss']
})
export class MemberNumberRecoveredComponent {
  @Input() memberEmail!: string;
  @Input() memberNumber!: string;

  constructor(private router: Router) {}

  routeToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }
}
