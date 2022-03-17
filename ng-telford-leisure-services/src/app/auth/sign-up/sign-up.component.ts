import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  currentPageNumber: number = 1;
  totalPageNumbers: number = 9;
  newMemberData = {};

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickBack() {
    if (this.currentPageNumber === 1) {
      this.router.navigateByUrl(`/sign-in`)
    } else {
      this.currentPageNumber--
    }
  }

  receiveAnswer($event: any) {
    Object.assign(this.newMemberData, $event);
    this.currentPageNumber++
    console.log('this.newMemberData: ', this.newMemberData)
  }

}
