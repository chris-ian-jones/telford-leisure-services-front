import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {

  emailForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initEmailForm();
  }

  initEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required],
    }, {updateOn: 'submit'})
  }

  onClickContinue() {
    
  }

}
