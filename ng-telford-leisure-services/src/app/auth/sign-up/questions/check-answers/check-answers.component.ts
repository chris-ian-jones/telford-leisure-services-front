import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-check-answers',
  templateUrl: './check-answers.component.html',
  styleUrls: ['./check-answers.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CheckAnswersComponent {
  @Input() newMemberData!: Member;
  @Output() changeAnswerEvent = new EventEmitter<any>();
  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;
  errorMessage: string = '';

  constructor(private signUpService: SignUpService, private router: Router) {}

  onClickChange(pageNumber: number) {
    this.changeAnswerEvent.emit(pageNumber);
  }

  onClickCreateAccount() {
    this.errorMessage = '';
    this.signUpMember(this.newMemberData);
  }

  async signUpMember(newMemberData: Member) {
    try {
      let response: any = await lastValueFrom(
        this.signUpService.signUpMember(newMemberData)
      );
      this.router.navigate(['sign-up/success'], {
        state: {
          memberNumber: response.body.memberNumber,
          mainCenter: response.body.mainCenter
        }
      });
    } catch (error: any) {
      this.errorMessage = error.error.message;
      setTimeout(() => this.errorSummaryDiv.nativeElement.focus());
    }
  }
}
