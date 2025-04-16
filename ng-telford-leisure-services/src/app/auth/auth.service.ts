import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Url } from './../core/constants/urls';
import { jwtDecode } from 'jwt-decode';
import { SignIn } from '../core/models/signIn';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

const exposeXAuthHeader = new HttpHeaders({
  'Access-Control-Expose-Headers': 'X-Authorization'
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {}

  get isLoggedIn() {
    return localStorage.getItem('sessionToken') ? true : false;
  }

  memberSignIn(signInData: SignIn) {
    const body = JSON.stringify(signInData);
    return this.http
      .post(`${Url.AUTH}/signin`, body, {
        headers: authHeaders,
        observe: 'response'
      })
      .pipe(tap((response) => this.setAuthentication(response)));
  }

  signOut() {
    localStorage.clear();
    this.ngZone.run(() => this.router.navigate(['sign-in']));
  }

  setAuthentication(response: any) {
    const token = response.body.token;
    localStorage.setItem('sessionToken', token);
  }

  getDecodedSessionToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
