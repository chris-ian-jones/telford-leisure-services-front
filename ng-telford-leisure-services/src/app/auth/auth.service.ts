import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Url } from './../core/constants/urls';
import { jwtDecode } from 'jwt-decode';
import { SignIn } from '../core/models/signIn';
import { Observable } from 'rxjs';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly authToken = signal<string | null>(
    localStorage.getItem('sessionToken')
  );
  private readonly navigationState = signal<string | null>(null);

  readonly isLoggedIn = computed(() => !!this.authToken());

  readonly decodedToken = computed(() => {
    const token = this.authToken();
    if (!token) return null;

    return jwtDecode(token) as object | null;
  });

  constructor() {
    effect(() => {
      const route = this.navigationState();
      if (route !== null) {
        this.router.navigate([route]);
        this.navigationState.set(null);
      }
    });
  }

  memberSignIn(signInData: SignIn): Observable<any> {
    const body = JSON.stringify(signInData);
    return this.http
      .post(`${Url.AUTH}/signin`, body, {
        headers: authHeaders,
        observe: 'response'
      })
      .pipe(tap((response) => this.setAuthentication(response)));
  }

  signOut() {
    this.authToken.set(null);
    localStorage.clear();
    this.navigationState.set('sign-in');
  }

  private setAuthentication(response: any) {
    const token = response.body.token;
    localStorage.setItem('sessionToken', token);
    this.authToken.set(token);
  }

  getDecodedSessionToken() {
    return this.decodedToken();
  }
}
