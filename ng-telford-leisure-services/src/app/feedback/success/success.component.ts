import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export default class SuccessComponent {
  constructor(private router: Router) {}
}
