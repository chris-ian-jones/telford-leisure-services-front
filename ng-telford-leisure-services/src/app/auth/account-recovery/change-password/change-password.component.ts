import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Input() memberEmail!: string;
  @Input() confirmationCode!: string;

  constructor() { }

  ngOnInit() {
  }

}
