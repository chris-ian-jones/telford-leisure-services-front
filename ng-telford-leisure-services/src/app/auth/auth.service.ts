import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, httpResource } from '@angular/common/http';
import { Url } from './../core/constants/urls';
import { jwtDecode } from 'jwt-decode';
import { SignIn } from '../core/models/signIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);

  private readonly authToken = signal<string | null>(
    localStorage.getItem('sessionToken')
  );
  private readonly navigationState = signal<string | null>(null);
  private readonly signInData = signal<SignIn | undefined>(undefined);

  readonly isLoggedIn = computed(() => !!this.authToken());

  readonly decodedToken = computed(() => {
    const token = this.authToken();
    if (!token) return null;

    return jwtDecode(token) as object | null;
  });

  signInResource = httpResource<
    { token: string } | { statusCode: number; message: string; error: string }
  >(() => {
    const data = this.signInData();
    if (!data) {
      return undefined;
    }
    return {
      method: 'POST',
      url: `${Url.AUTH}/signin`,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    };
  });

  constructor() {
    effect(() => {
      const response = this.signInResource.value();
      if (response) {
        this.setAuthentication(response);
      }

      const route = this.navigationState();
      if (route !== null) {
        this.router.navigate([route]);
        this.navigationState.set(null);
      }
    });
  }

  setSignInData(data: SignIn) {
    this.signInData.set(data);
  }

  signOut() {
    this.authToken.set(null);
    localStorage.clear();
    this.navigationState.set('sign-in');
  }

  private setAuthentication(response: any) {
    if ('token' in response) {
      const token = response.body.token;
      localStorage.setItem('sessionToken', token);
      this.authToken.set(token);
    }
  }

  getDecodedSessionToken() {
    return this.decodedToken();
  }
}
