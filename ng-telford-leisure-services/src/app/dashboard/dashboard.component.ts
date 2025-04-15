import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

declare let require: any;
const confetti = require('canvas-confetti');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  @ViewChild('confettiDiv', { static: false }) confettiDiv: ElementRef;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.showConfetti();
  }

  showConfetti() {
    const myConfetti = confetti.create(this.confettiDiv, {
      resize: true,
      particleCount: 600,
      spread: 180,
      startVelocity: 30
    });
    myConfetti();
  }

  onClickSignOut() {
    this.authService.signOut();
  }
}
