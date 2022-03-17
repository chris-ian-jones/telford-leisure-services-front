import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-answers',
  templateUrl: './check-answers.component.html',
  styleUrls: ['./check-answers.component.scss']
})
export class CheckAnswersComponent implements OnInit {

  @Input() newMemberData!: {};

  constructor() { }

  ngOnInit() {
    console.log('newMemberData: ', this.newMemberData)
  }

}
