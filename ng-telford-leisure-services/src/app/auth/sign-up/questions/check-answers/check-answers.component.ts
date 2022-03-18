import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from './../../../../core/models/Member';

@Component({
  selector: 'app-check-answers',
  templateUrl: './check-answers.component.html',
  styleUrls: ['./check-answers.component.scss']
})
export class CheckAnswersComponent implements OnInit {

  @Input() newMemberData!: Member;
  @Output() changeAnswerEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log('newMemberData: ', this.newMemberData)

    this.newMemberData.addressLineOne = '399 Marston Road'
    this.newMemberData.addressLineTwo = ''
    this.newMemberData.county = 'Oxfordshire'
    this.newMemberData.dateOfBirth = 'Sun Mar 02 1986 00:00:00 GMT+0000'
    this.newMemberData.email = 'hello@chris-jones.dev'
    this.newMemberData.ethnicity = 'White UK/Irish/Euro'
    this.newMemberData.firstName = 'Chris'
    this.newMemberData.gender = 'Male'
    this.newMemberData.lastName = 'Jones'
    this.newMemberData.mainCenter = 'Phoenix Sports and Leisure Centre'
    this.newMemberData.membershipType = 'TLC Adt Resident 16+ - ADT'
    this.newMemberData.phone = '07979636899'
    this.newMemberData.postcode = 'OX3 0JF'
    this.newMemberData.townOrCity = 'Oxford'
  }

  onClickChange(pageNumber:number) {
    this.changeAnswerEvent.emit(pageNumber)
  }

}
