import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  currentPageNumber: number = 5;
  totalPageNumbers: number = 9;
  firstName:string = '';
  lastName:string = '';
  dateOfBirth:string = '';
  gender:string = '';
  email:string = '';
  phone:string = '';
  addressLineOne:string = '';
  addressLineTwo:string = '';
  townOrCity:string = '';
  county:string = '';
  postcode:string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickBack() {
    console.log('firstName: ', this.firstName)
    console.log('lastName: ', this.lastName)
    console.log('dateOfBirth: ', this.dateOfBirth)
    console.log('gender: ', this.gender)
    console.log('email: ', this.email)
    console.log('phone: ', this.phone)
    if (this.currentPageNumber === 1) {
      this.router.navigateByUrl(`/sign-in`)
    } else {
      this.currentPageNumber--
    }
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

  receiveAnswerFive($event: any) {
    this.addressLineOne = $event.addressLineOne;
    this.addressLineTwo = $event.addressLineTwo;
    this.townOrCity = $event.townOrCity;
    this.county = $event.county;
    this.postcode = $event.postcode;
    this.currentPageNumber++
  }

}
