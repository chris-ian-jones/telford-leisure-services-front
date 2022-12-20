/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuestionFourComponent } from './question-four.component';

describe('QuestionFourComponent', () => {
  let component: QuestionFourComponent;
  let fixture: ComponentFixture<QuestionFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionFourComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
