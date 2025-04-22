import { Component, AfterViewInit, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [CommonModule, RouterModule]
})
export default class DashboardComponent implements AfterViewInit {
  private readonly authService = inject(AuthService);

  ngAfterViewInit() {
    this.showConfetti();
  }

  showConfetti() {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const renderFrame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();
  }

  onClickSignOut() {
    this.authService.signOut();
  }
}
