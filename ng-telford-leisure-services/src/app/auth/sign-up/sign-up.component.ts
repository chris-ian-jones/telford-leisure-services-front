import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  currentPageNumber: number = 3;
  totalPageNumbers: number = 9;
  firstName:string = '';
  lastName:string = '';
  dateOfBirth:string = '';
  gender:string = '';
  email:string = '';
  phone:string = '';

  constructor() { }

  ngOnInit() {
  }

  onClickBack() {
    console.log('firstName: ', this.firstName)
    console.log('lastName: ', this.lastName)
    console.log('dateOfBirth: ', this.dateOfBirth)
    console.log('gender: ', this.gender)
    console.log('email: ', this.email)
    console.log('phone: ', this.phone)
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

  receiveAnswerThree($event: any) {
    this.gender = $event;
    this.currentPageNumber++
  }

  receiveAnswerFour($event: any) {
    this.email = $event.email;
    this.phone = $event.phone;
    this.currentPageNumber++
  }

}
