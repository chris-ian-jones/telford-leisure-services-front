import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from 'src/app/core/constants/urls';
import { ConfirmCode } from 'src/app/core/models/confirmCode';
import { Email } from './../../core/models/email';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
})

@Injectable({
  providedIn: 'root'
})
export class AccountRecoveryService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  sendConfirmationCodeEmail(email:Email) {
    return this.http.post(`${Url.AUTH}/generate-confirmation-code`, email, {headers: authHeaders, observe: 'response'})
  }

  validateConfirmationCode(payload:ConfirmCode) {
    return this.http.post(`${Url.AUTH}/validate-confirmation-code`, payload, {headers: authHeaders, observe: 'response'})
  }

}
