import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private location: Location
  ) { }

  removeHashPathFromCurrentPath() {
    const pathWithoutHash = this.location.path(false);
    this.location.replaceState(pathWithoutHash);
  }

}
