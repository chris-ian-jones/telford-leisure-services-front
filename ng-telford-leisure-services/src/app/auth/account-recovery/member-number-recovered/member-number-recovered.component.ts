import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-number-recovered',
  templateUrl: './member-number-recovered.component.html',
  styleUrl: './member-number-recovered.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class MemberNumberRecoveredComponent {
  @Input() memberEmail!: string;
  @Input() memberNumber!: string;

  constructor(private router: Router) {}

  routeToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }
}
