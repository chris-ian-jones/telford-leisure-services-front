import {
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../../sign-up.service';
import { Member } from './../../../../core/models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-check-answers',
  templateUrl: './check-answers.component.html',
  styleUrl: './check-answers.component.scss',
  imports: [CommonModule, RouterModule]
})
export class CheckAnswersComponent {
  private readonly router = inject(Router);
  private readonly signUpService = inject(SignUpService);

  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;
  @Output() changeAnswerEvent = new EventEmitter<any>();

  newMemberData = input.required<Member>();
  errorMessage = signal<string>('');

  hasError = computed(() => !!this.errorMessage());

  constructor() {
    effect(() => {
      const signUpResource = this.signUpService.signUpMemberResource;

      const error = signUpResource.error();
      if (error) {
        this.errorMessage.set(
          (error as any).error?.message || 'An error occurred'
        );
        setTimeout(() => this.errorSummaryDiv.nativeElement.focus());
        return;
      }

      const result = signUpResource.value();

      if (result) {
        const response = result as any;
        this.router.navigate(['sign-up/success'], {
          state: {
            memberNumber: response.memberNumber,
            mainCenter: response.mainCenter
          }
        });
      }
    });
  }

  onClickChange(pageNumber: number) {
    this.errorMessage.set('');
    this.signUpService.setMemberData(undefined);
    this.changeAnswerEvent.emit(pageNumber);
  }

  onClickCreateAccount() {
    this.errorMessage.set('');
    this.signUpService.setMemberData(this.newMemberData());
  }
}
