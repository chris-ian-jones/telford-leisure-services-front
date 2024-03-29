/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmailCodeComponent } from './email-code.component';

describe('EmailCodeComponent', () => {
  let component: EmailCodeComponent;
  let fixture: ComponentFixture<EmailCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailCodeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
