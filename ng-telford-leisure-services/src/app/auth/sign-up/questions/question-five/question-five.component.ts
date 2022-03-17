import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-five',
  templateUrl: './question-five.component.html',
  styleUrls: ['./question-five.component.scss']
})
export class QuestionFiveComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() answerFiveEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
