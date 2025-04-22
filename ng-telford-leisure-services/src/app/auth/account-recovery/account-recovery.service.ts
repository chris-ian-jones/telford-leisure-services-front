import { HttpHeaders, httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Url } from './../../core/constants/urls';
import { ChangePassword } from './../../core/models/changePassword';
import { ForgotMemberNumber } from './../../core/models/forgotMemberNumber';
import { Email } from './../../core/models/email';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class AccountRecoveryService {

  private readonly changePasswordData = signal<ChangePassword | undefined>(
    undefined
  );
  
  private readonly confirmationCodeData = signal<Email | undefined>(undefined);
  private readonly validateCodeData = signal<ForgotMemberNumber | undefined>(
    undefined
  );
  private readonly forgotMemberData = signal<ForgotMemberNumber | undefined>(
    undefined
  );

  changePasswordResource = httpResource<ChangePassword>(() => {
    const data = this.changePasswordData();
    if (!data) return undefined;
    return {
      method: 'POST',
      url: `${Url.AUTH}/change-password`,
      headers: authHeaders,
      body: data
    };
  });

  confirmationCodeResource = httpResource<Email>(() => {
    const data = this.confirmationCodeData();
    if (!data) return undefined;
    return {
      method: 'POST',
      url: `${Url.AUTH}/generate-confirmation-code`,
      headers: authHeaders,
      body: data
    };
  });

  validateCodeResource = httpResource<ForgotMemberNumber>(() => {
    const data = this.validateCodeData();
    if (!data) return undefined;
    return {
      method: 'POST',
      url: `${Url.AUTH}/validate-confirmation-code`,
      headers: authHeaders,
      body: data
    };
  });

  forgotMemberResource = httpResource<ForgotMemberNumber>(() => {
    const data = this.forgotMemberData();
    if (!data) return undefined;
    return {
      method: 'POST',
      url: `${Url.AUTH}/forgot-member-number`,
      headers: authHeaders,
      body: data
    };
  });

  setChangePasswordData(data: ChangePassword | undefined) {
    this.changePasswordData.set(data);
  }

  setConfirmationCodeData(data: Email | undefined) {
    this.confirmationCodeData.set(data);
  }

  setValidateCodeData(data: ForgotMemberNumber | undefined) {
    this.validateCodeData.set(data);
  }

  setForgotMemberData(data: ForgotMemberNumber | undefined) {
    this.forgotMemberData.set(data);
  }
}
