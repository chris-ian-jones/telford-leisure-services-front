/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuestionThreeComponent } from './question-three.component';

describe('QuestionThreeComponent', () => {
  let component: QuestionThreeComponent;
  let fixture: ComponentFixture<QuestionThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionThreeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
