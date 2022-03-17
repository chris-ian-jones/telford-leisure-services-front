import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-seven',
  templateUrl: './question-seven.component.html',
  styleUrls: ['./question-seven.component.scss']
})
export class QuestionSevenComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() answerSevenEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
