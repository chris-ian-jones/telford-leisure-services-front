import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent {
  showSystemMessage = false;

  constructor(private router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.router.url === '/sign-in'
          ? (this.showSystemMessage = true)
          : (this.showSystemMessage = false);
      }
    });
  }
}
