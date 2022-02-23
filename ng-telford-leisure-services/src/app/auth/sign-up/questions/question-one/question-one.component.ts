import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-one',
  templateUrl: './question-one.component.html',
  styleUrls: ['./question-one.component.scss']
})
export class QuestionOneComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPages: number;

  constructor() { }

  ngOnInit() {
  }

}
