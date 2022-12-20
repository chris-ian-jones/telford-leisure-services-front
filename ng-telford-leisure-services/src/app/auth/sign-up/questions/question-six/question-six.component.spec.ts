/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuestionSixComponent } from './question-six.component';

describe('QuestionSixComponent', () => {
  let component: QuestionSixComponent;
  let fixture: ComponentFixture<QuestionSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionSixComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
