import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  currentPageNumber: number = 1;
  totalPageNumbers: number = 9;

  constructor() { }

  ngOnInit() {
  }

  onClickBack() {
    console.log('back clicked')
  }

}
