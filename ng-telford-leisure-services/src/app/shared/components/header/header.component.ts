import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent {
  showSystemMessage = false;

  private readonly router = inject(Router);

  constructor() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.router.url === '/sign-in'
          ? (this.showSystemMessage = true)
          : (this.showSystemMessage = false);
      }
    });
  }
}
