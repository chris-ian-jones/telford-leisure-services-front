import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-six',
  templateUrl: './question-six.component.html',
  styleUrls: ['./question-six.component.scss']
})
export class QuestionSixComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() answerSixEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
