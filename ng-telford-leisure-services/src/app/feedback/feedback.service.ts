import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../core/constants/urls';
import { Feedback } from '../core/models/feedback';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
})

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  createNewFeedback(feedbackData:Feedback) {
    return this.http.post(`${Url.FEEDBACK}/new`, feedbackData, {headers: authHeaders, observe: 'response'})
  }
}
