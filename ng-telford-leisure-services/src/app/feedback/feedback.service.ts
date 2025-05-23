import { HttpHeaders, httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Url } from '../core/constants/urls';
import { Feedback } from '../core/models/feedback';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly feedbackData = signal<Feedback | undefined>(undefined);

  createFeedbackResource = httpResource<Feedback>(() => {
    const data = this.feedbackData();
    if (!data) {
      return undefined;
    }
    return {
      method: 'POST',
      url: `${Url.FEEDBACK}/new`,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    };
  });

  setFeedbackData(data: Feedback) {
    this.feedbackData.set(data);
  }
}
