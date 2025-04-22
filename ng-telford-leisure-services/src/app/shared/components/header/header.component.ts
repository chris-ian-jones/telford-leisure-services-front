import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnDestroy {
  private readonly router = inject(Router);
  private subscription: Subscription;

  showSystemMessage = false;

  constructor() {
    this.subscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.router.url === '/sign-in'
          ? (this.showSystemMessage = true)
          : (this.showSystemMessage = false);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
