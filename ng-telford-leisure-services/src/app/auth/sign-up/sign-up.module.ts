import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { QuestionOneComponent } from './questions/question-one/question-one.component';
import { QuestionTwoComponent } from './questions/question-two/question-two.component';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule
  ],
  declarations: [
    SignUpComponent,
    QuestionOneComponent,
    QuestionTwoComponent
  ]
})
export class SignUpModule { }
