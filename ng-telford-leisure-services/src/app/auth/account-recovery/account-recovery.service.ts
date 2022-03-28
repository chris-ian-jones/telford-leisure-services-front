import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from 'src/app/core/constants/urls';
import { ChangePassword } from 'src/app/core/models/changePassword';
import { ForgotMemberNumber } from 'src/app/core/models/forgotMemberNumber';
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

  validateConfirmationCode(payload:ForgotMemberNumber) {
    return this.http.post(`${Url.AUTH}/validate-confirmation-code`, payload, {headers: authHeaders, observe: 'response'})
  }

  forgotMemberNumber(payload:ForgotMemberNumber) {
    return this.http.post(`${Url.AUTH}/forgot-member-number`, payload, {headers: authHeaders, observe: 'response'})
  }

  changePassword(payload:ChangePassword) {
    return this.http.post(`${Url.AUTH}/change-password`, payload, {headers: authHeaders, observe: 'response'})
  }

}
