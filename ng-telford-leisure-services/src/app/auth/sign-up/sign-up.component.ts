import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Member } from './../../core/models/member';
import { QuestionOneComponent } from './questions/question-one/question-one.component';
import { QuestionTwoComponent } from './questions/question-two/question-two.component';
import { QuestionThreeComponent } from './questions/question-three/question-three.component';
import { QuestionFourComponent } from './questions/question-four/question-four.component';
import { QuestionFiveComponent } from './questions/question-five/question-five.component';
import { QuestionSixComponent } from './questions/question-six/question-six.component';
import { QuestionSevenComponent } from './questions/question-seven/question-seven.component';
import { QuestionEightComponent } from './questions/question-eight/question-eight.component';
import { CheckAnswersComponent } from './questions/check-answers/check-answers.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  imports: [
    CommonModule,
    QuestionOneComponent,
    QuestionTwoComponent,
    QuestionThreeComponent,
    QuestionFourComponent,
    QuestionFiveComponent,
    QuestionSixComponent,
    QuestionSevenComponent,
    QuestionEightComponent,
    CheckAnswersComponent,
    RouterModule
  ]
})
export default class SignUpComponent {
  currentPageNumber: number = 1;
  totalPageNumbers: number = 8;
  @Output() newMemberData: Member = {
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
    membershipType: ''
  };
  @Output() changeAnswer: boolean = false;

  constructor(private router: Router) {}

  onClickBack() {
    if (this.currentPageNumber === 1) {
      this.router.navigateByUrl(`/sign-in`);
    } else {
      this.currentPageNumber--;
    }
  }

  receiveAnswer($event: any) {
    Object.assign(this.newMemberData, $event);
    window.scrollTo(0, 0);
    if (this.changeAnswer) {
      this.changeAnswer = false;
      this.currentPageNumber = this.totalPageNumbers + 1;
    } else {
      this.currentPageNumber++;
    }
  }

  receiveChangeAnswerPage($event: any) {
    window.scrollTo(0, 0);
    this.currentPageNumber = $event;
    this.changeAnswer = true;
  }
}
