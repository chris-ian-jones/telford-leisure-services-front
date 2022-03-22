import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-code',
  templateUrl: './email-code.component.html',
  styleUrls: ['./email-code.component.scss']
})
export class EmailCodeComponent implements OnInit {

  @Output() changeComponentEvent = new EventEmitter<any>();
  confirmationCodeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initConfirmationCodeForm();
  }

  initConfirmationCodeForm() {
    this.confirmationCodeForm = this.formBuilder.group({
      confirmationCode: ['', Validators.required],
    }, {updateOn: 'submit'})
  }

  onClickConfirm() {

  }

  onClickBack() {
    this.changeComponentEvent.emit('email-confirm')
  }

  onClickStartAgain() {
    this.changeComponentEvent.emit('email-check')
  }

}
