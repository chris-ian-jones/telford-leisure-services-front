import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.initSignInForm();
  }

  initSignInForm() {
    this.signInForm = this.formBuilder.group({
      memberNumber: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signIn() {
    if (this.signInForm.valid) {
      const payload = {
        'memberNumber': this.signInForm.get('memberNumber').value,
        'password': this.signInForm.get('password').value
      }
      this.authService.memberSignIn(payload).subscribe(response => {
        this.router.navigateByUrl('dashboard')
      }, error => {
        console.log('error')
      })
    } else {
      console.log('sign in form invalid')
    }
  }

}
