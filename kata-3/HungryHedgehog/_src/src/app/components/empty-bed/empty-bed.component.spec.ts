import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyBedComponent } from './empty-bed.component';

describe('EmptyBedComponent', () => {
  let component: EmptyBedComponent;
  let fixture: ComponentFixture<EmptyBedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyBedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
