import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SuccessComponent {
  memberNumber: string = '123456777';
  mainCenter: string = 'Donnington Wood';

  constructor(private router: Router) {
    const routeData = this.router.getCurrentNavigation().extras.state;
    if (routeData) {
      this.memberNumber = routeData['memberNumber'];
      this.mainCenter = routeData['mainCenter'];
    }
  }
}
