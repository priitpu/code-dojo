import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedMenuComponent } from './seed-menu.component';

describe('SeedMenuComponent', () => {
  let component: SeedMenuComponent;
  let fixture: ComponentFixture<SeedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeedMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
