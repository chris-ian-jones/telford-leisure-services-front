import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Input() memberEmail!: string;
  @Input() confirmationCode!: string;
  passwordForm!: FormGroup;
  successCharacters: boolean = true;
  successSymbol: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initPasswordForm();
  }

  initPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    
  }

}
