import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { QuestionOneComponent } from './questions/question-one/question-one.component';
import { QuestionTwoComponent } from './questions/question-two/question-two.component';
import { QuestionThreeComponent } from './questions/question-three/question-three.component';
import { QuestionFourComponent } from './questions/question-four/question-four.component';
import { QuestionFiveComponent } from './questions/question-five/question-five.component';
import { QuestionSixComponent } from './questions/question-six/question-six.component';
import { QuestionSevenComponent } from './questions/question-seven/question-seven.component';
import { QuestionEightComponent } from './questions/question-eight/question-eight.component';
import { SignUpService } from './sign-up.service';
import { CheckAnswersComponent } from './questions/check-answers/check-answers.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SignUpComponent,
    QuestionOneComponent,
    QuestionTwoComponent,
    QuestionThreeComponent,
    QuestionFourComponent,
    QuestionFiveComponent,
    QuestionSixComponent,
    QuestionSevenComponent,
    QuestionEightComponent,
    CheckAnswersComponent,
    SuccessComponent
  ],
  providers: [SignUpService]
})
export class SignUpModule {}
