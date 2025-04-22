import { HttpHeaders, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Location } from '@angular/common';
import { Url } from './../../core/constants/urls';
import { Member } from './../../core/models/member';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private readonly memberData = signal<Member | undefined>(undefined);

  private readonly location = inject(Location);

  signUpMemberResource = httpResource<Member>(() => {
    const data = this.memberData();
    if (!data) {
      return undefined;
    }
    return {
      method: 'POST',
      url: `${Url.AUTH}/signup`,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    };
  });

  setMemberData(data: Member) {
    this.memberData.set(data);
  }

  removeHashPathFromCurrentPath() {
    const pathWithoutHash = this.location.path(false);
    this.location.replaceState(pathWithoutHash);
  }
}
