import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kata01Component } from './kata01.component';

describe('Kata01Component', () => {
  let component: Kata01Component;
  let fixture: ComponentFixture<Kata01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Kata01Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Kata01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
