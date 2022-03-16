import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { QuestionOneComponent } from './questions/question-one/question-one.component';
import { QuestionTwoComponent } from './questions/question-two/question-two.component';
import { QuestionThreeComponent } from './questions/question-three/question-three.component';
import { QuestionFourComponent } from './questions/question-four/question-four.component';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SignUpComponent,
    QuestionOneComponent,
    QuestionTwoComponent,
    QuestionThreeComponent,
    QuestionFourComponent
  ]
})
export class SignUpModule { }
