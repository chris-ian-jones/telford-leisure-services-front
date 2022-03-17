import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from './../../core/models/Member';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  currentPageNumber: number = 9;
  totalPageNumbers: number = 8;
  newMemberData: Member = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    addressLineOne: '',
    addressLineTwo: '',
    townOrCity: '',
    county: '',
    postcode: '',
    ethnicity: '',
    mainCenter: '',
    membershipType: '',
  };

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
  
  receiveChangeAnswerPage($event: any) {
    this.currentPageNumber = $event;
  }

}
