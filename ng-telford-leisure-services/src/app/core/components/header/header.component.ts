import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showSystemMessage = false;

  constructor(private router: Router) {
    router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        this.router.url === '/sign-in' ? this.showSystemMessage = true : this.showSystemMessage = false;
      }
    });
  }

  ngOnInit() {}

}
