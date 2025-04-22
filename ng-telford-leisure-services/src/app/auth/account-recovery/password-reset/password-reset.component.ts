import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
  imports: [CommonModule, RouterModule]
})
export class PasswordResetComponent {
  private readonly router = inject(Router);

  routeToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }
}
