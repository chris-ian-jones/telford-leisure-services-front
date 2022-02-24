import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @ViewChild('errorSummary', { static: false }) errorSummaryDiv!: ElementRef;
  signInForm!: FormGroup;
  errorSummary: any = [];

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
      password: ['', Validators.required],
    }, {updateOn: 'submit'})
  }

  signIn() {
    this.errorSummary.length = 0;
    if (this.signInForm.valid) {
      const unformattedMemberNumber = this.signInForm.get('memberNumber').value
      const payload = {
        'memberNumber': unformattedMemberNumber.toString(),
        'password': this.signInForm.get('password').value
      }
      this.authService.memberSignIn(payload).subscribe(response => {
        this.router.navigateByUrl('dashboard')
      }, error => {
        if (error.error.error === 'Unauthorized') {
          this.signInForm.controls['memberNumber'].setErrors({'unauthorized': true});
          this.getAllFormValidationErrors();
        } else {
          this.signInForm.controls['memberNumber'].setErrors({'error': true});
          this.getAllFormValidationErrors();
        }
        setTimeout(() => this.errorSummaryDiv.nativeElement.focus())
      })
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.signInForm.controls).forEach(control => {
      const controlErrors: ValidationErrors = this.signInForm.get(control).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(error => {
          this.errorSummary.push(
            {
              control,
              error
            }
          )
        });
        setTimeout(() => this.errorSummaryDiv.nativeElement.focus())
      }
    });
  }
}
