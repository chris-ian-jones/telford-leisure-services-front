import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/Member';

@Component({
  selector: 'app-check-answers',
  templateUrl: './check-answers.component.html',
  styleUrls: ['./check-answers.component.scss']
})
export class CheckAnswersComponent implements OnInit {

  @Input() newMemberData!: Member;
  @Output() changeAnswerEvent = new EventEmitter<any>();

  constructor(
    private signUpService: SignUpService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickChange(pageNumber:number) {
    this.changeAnswerEvent.emit(pageNumber)
  }

  onClickCreateAccount() {
    this.signUpService.signUpMember(this.newMemberData).subscribe((response:any) => {
      console.log('response: ', response)
      this.router.navigate(['sign-up/success'], {
        state:{
          memberNumber: response.memberNumber,
          mainCenter: response.mainCenter
        }
      });
    }, error => {
      console.log('error.error.message: ', error.error.message)
    })
  }

}
