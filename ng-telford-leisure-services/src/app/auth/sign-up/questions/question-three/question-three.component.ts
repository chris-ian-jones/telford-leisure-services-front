import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-three',
  templateUrl: './question-three.component.html',
  styleUrls: ['./question-three.component.scss']
})
export class QuestionThreeComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() answerThreeEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
