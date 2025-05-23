import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  imports: [CommonModule, RouterModule]
})
export default class SuccessComponent {
  private readonly router = inject(Router);

  memberNumber = signal<string>('');
  mainCenter = signal<string>('');

  constructor() {
    const routeData = this.router.getCurrentNavigation().extras.state;
    if (routeData) {
      this.memberNumber.set(routeData['memberNumber']);
      this.mainCenter.set(routeData['mainCenter']);
    }
  }
}
