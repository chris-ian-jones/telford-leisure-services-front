import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [FeedbackComponent]
})
export class FeedbackModule { }
