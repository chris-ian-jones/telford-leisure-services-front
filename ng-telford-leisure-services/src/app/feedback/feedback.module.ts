import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackService } from './feedback.service';
import { SuccessComponent } from './success/success.component';

@NgModule({
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FeedbackComponent,
    SuccessComponent
  ],
  providers: [
    FeedbackService
  ]
})
export class FeedbackModule { }
