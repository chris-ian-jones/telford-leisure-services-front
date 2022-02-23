import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.component.html',
  styleUrls: ['./question-two.component.scss']
})
export class QuestionTwoComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPages: number;

  constructor() { }

  ngOnInit() {
  }

}
