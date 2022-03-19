import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from './../../core/constants/urls';
import { Member } from './../../core/models/Member';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
})

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private location: Location,
    private readonly http: HttpClient,
  ) { }

  removeHashPathFromCurrentPath() {
    const pathWithoutHash = this.location.path(false);
    this.location.replaceState(pathWithoutHash);
  }

  signUpMember(memberData:Member) {
    return this.http.post(`${Url.AUTH}/signup`, memberData, {headers: authHeaders, observe: 'response'})
  }
}
