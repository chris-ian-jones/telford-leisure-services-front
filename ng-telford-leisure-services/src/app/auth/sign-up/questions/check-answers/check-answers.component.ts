import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @ViewChild('errorSummary', {static: false}) errorSummaryDiv!: ElementRef;
  errorMessage: string = '';

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
    this.errorMessage = ''
    this.signUpService.signUpMember(this.newMemberData).subscribe((response:any) => {
      this.router.navigate(['sign-up/success'], {
        state:{
          memberNumber: response.body.memberNumber,
          mainCenter: response.body.mainCenter
        }
      });
    }, error => {
      this.errorMessage = error.error.message;
      setTimeout(() => this.errorSummaryDiv.nativeElement.focus())
    })
  }

}
