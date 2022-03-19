import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    private signUpService: SignUpService
  ) { }

  ngOnInit() {
  }

  onClickChange(pageNumber:number) {
    this.changeAnswerEvent.emit(pageNumber)
  }

  onClickCreateAccount() {
    // todo
    this.signUpService.signUpMember(this.newMemberData).subscribe(response => {
      console.log('response: ', response)
    }, error => {
      console.log('error.error.message: ', error.error.message)
    })
  }

}
