import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Url } from './../core/constants/urls';
import jwt_decode from 'jwt-decode';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
})

const exposeXAuthHeader = new HttpHeaders({
  'Access-Control-Expose-Headers': 'X-Authorization'
})

interface SignInData {
  memberNumber: number;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) { }

  get isLoggedIn() {
    return localStorage.getItem('sessionToken') ? true: false
  }

  memberSignIn(signInData: SignInData) {
    const body = JSON.stringify(signInData)
    return this.http.post(`${Url.AUTH}/signin`, body, {headers: authHeaders, observe: 'response'})
      .pipe(tap(response => this.setAuthentication(response)))
  }

  signOut() {
    localStorage.clear()
    this.ngZone.run(() => this.router.navigate(['/']))
  }

  setAuthentication(response: any) {
    const token = response.body.token
    localStorage.setItem('sessionToken', token)
  }

  getDecodedSessionToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch(Error) {
      return null;
    }
  }
}
