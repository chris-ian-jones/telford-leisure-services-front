import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  currentPageNumber: number = 2;
  totalPageNumbers: number = 9;
  firstName:string = '';
  lastName:string = '';
  dateOfBirth:string = '';

  constructor() { }

  ngOnInit() {
  }

  onClickBack() {
    console.log('firstName: ', this.firstName)
    console.log('lastName: ', this.lastName)
    console.log('dateOfBirth: ', this.dateOfBirth)
  }

  receiveAnswerOne($event: any) {
    this.firstName = $event.firstName;
    this.lastName = $event.lastName;
    this.currentPageNumber++
  }

  receiveAnswerTwo($event: any) {
    this.dateOfBirth = $event;
    this.currentPageNumber++
  }

}
