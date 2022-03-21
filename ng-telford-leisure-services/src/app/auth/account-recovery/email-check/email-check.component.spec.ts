/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmailCheckComponent } from './email-check.component';

describe('EmailCheckComponent', () => {
  let component: EmailCheckComponent;
  let fixture: ComponentFixture<EmailCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
