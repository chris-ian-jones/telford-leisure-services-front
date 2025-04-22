import { Component, inject } from '@angular/core';
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
}
